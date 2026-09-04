const Express = require('express')
const publicRoutes = require('./publicRoutes')
const routes = require('./routes')
const connectDB = require('./infra/mongoose/mongooseConect')
const app = new Express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger')
const UserController = require('./controller/User')
const cors = require('cors')
const firebaseAuth = require('./infra/firebaseAdmin')
const userRepository = require('./infra/mongoose/repository/userRepository')
const accountRepository = require('./infra/mongoose/repository/accountRepository')

app.use(Express.json())

app.use(
  cors({
    origin: '*'
  })
)

app.use(publicRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(async (req, res, next) => {
  if (req.url.includes('/docs')) {
    return next()
  }
  const [scheme, token] = req.headers['authorization']?.split(' ') || []
  if (scheme !== 'Bearer' || !token)
    return res.status(401).json({ message: 'Token inválido' })

  if (firebaseAuth) {
    try {
      const decodedToken = await firebaseAuth.verifyIdToken(token)
      const users = await userRepository.get({ email: decodedToken.email })
      let user = users[0]

      if (!user) {
        user = await userRepository.create({
          username: decodedToken.name || decodedToken.email.split('@')[0],
          email: decodedToken.email,
          password: `firebase:${decodedToken.uid}`
        })
      }

      const accounts = await accountRepository.get({ userId: user._id })
      if (!accounts[0]) {
        await accountRepository.create({
          userId: user._id,
          bank: 'Não informado',
          nickname: 'Conta principal',
          balance: 0,
          type: 'CURRENT'
        })
      }

      req.user = { ...decodedToken, id: user._id.toString() }
      return next()
    } catch (error) {
      // Keep the legacy JWT authentication available for existing API clients.
    }
  }

  const user = UserController.getToken(token)
  if (!user) return res.status(401).json({ message: 'Token inválido' })
  req.user = user
  next()
})
app.use(routes)

const serverPromise = connectDB().then(() => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.port || 3000, () => {
      console.log('Servidor rodando na porta 3000')
    })
  }
})

module.exports = app
module.exports.ready = serverPromise
