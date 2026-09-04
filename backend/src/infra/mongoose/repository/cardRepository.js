const { Card } = require('../modelos')

const create = async (userData) => {
  const card = new Card(userData)
  return card.save()
}

const getById = async (id) => {
  return Card.findById(id)
}

const get = async (card = {}) => {
  return Card.find(card)
}

const block = async (id, userId) => {
  const card = await Card.findById(id).populate({
    path: 'accountId',
    match: { userId }
  })

  if (!card?.accountId) return null

  return Card.findOneAndUpdate(
    { _id: id, accountId: card.accountId._id, isDeactivate: { $ne: true } },
    { $set: { isDeactivate: true } },
    { new: true }
  )
}

module.exports = {
  create,
  getById,
  get,
  block
}
