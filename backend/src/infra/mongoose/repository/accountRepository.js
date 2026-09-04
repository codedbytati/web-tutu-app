const { Account } = require('../modelos')

const create = async (userData) => {
  const user = new Account(userData)
  return user.save()
}

const getById = async (id) => {
  return Account.findById(id)
}

const get = async (account = {}) => {
  return Account.find(account)
}

const block = async (id, userId) => {
  const account = await Account.findOne({ _id: id, userId })
  if (!account) return null

  account.isDeactivate = !account.isDeactivate
  return account.save()
}

module.exports = {
  create,
  getById,
  get,
  block
}
