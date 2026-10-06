const User = require('../../models/User')
const { hashPassword } = require('../../infra/security/password')

const saveUser = async ({ user, repository }) => {
  user.password = await hashPassword(user.password)
  const resultado = await repository.create(user)
  return new User(resultado.toJSON())
}

module.exports = saveUser
