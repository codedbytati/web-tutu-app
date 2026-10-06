const userDTO = require('../models/User')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { verifyPassword } = require('../infra/security/password')

const JWT_SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === 'test'
    ? crypto.randomBytes(32).toString('hex')
    : null)

class UserController {
  constructor(di = {}) {
    this.di = Object.assign(
      {
        userRepository: require('../infra/mongoose/repository/userRepository'),
        salvarUsuario: require('../feature/User/salvarUsuario'),
        getUser: require('../feature/User/getUser')
      },
      di
    )
  }

  async create(req, res) {
    const user = new userDTO(req.body)
    const { userRepository, salvarUsuario } = this.di

    if (
      !user.isValid() ||
      typeof user.username !== 'string' ||
      typeof user.email !== 'string' ||
      typeof user.password !== 'string' ||
      user.username.length > 120 ||
      user.email.length > 254 ||
      user.password.length < 8 ||
      user.password.length > 128
    )
      return res.status(400).json({ message: 'não houve informações enviadas' })
    try {
      const userCreated = await salvarUsuario({
        user,
        repository: userRepository
      })

      res.status(201).json({
        message: 'usuário criado com sucesso',
        result: userCreated
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'caiu a aplicação' })
    }
  }
  async find(req, res) {
    const { userRepository, getUser } = this.di
    try {
      const users = await getUser({ repository: userRepository })
      res.status(200).json({
        message: 'Usuário carregado com sucesso',
        result: users
      })
    } catch (error) {
      res.status(500).json({
        message: 'Erro no servidor'
      })
    }
  }
  async auth(req, res) {
    const { userRepository } = this.di
    const { email, password } = req.body
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Credenciais inválidas' })
    }

    const users = await userRepository.get({ email })
    const user = users?.[0]
    const passwordMatches =
      user && (await verifyPassword(password, user.password))

    if (!passwordMatches)
      return res.status(401).json({ message: 'Usuário não encontrado' })

    if (!JWT_SECRET) {
      return res.status(500).json({ message: 'Autenticação não configurada' })
    }

    const userToTokenize = {
      id: user._id.toString(),
      username: user.username,
      email: user.email
    }
    res.status(200).json({
      message: 'Usuário autenticado com sucesso',
      result: {
        token: jwt.sign(userToTokenize, JWT_SECRET, { expiresIn: '12h' })
      }
    })
  }
  static getToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      return decoded
    } catch (error) {
      return null
    }
  }
}

module.exports = UserController
