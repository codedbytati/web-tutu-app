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

const updateSpent = async (id, amount) => {
  return Card.findByIdAndUpdate(
    id,
    [
      { $set: { spent: { $add: ['$spent', amount] } } },
      { $set: { available: { $subtract: ['$limit', '$spent'] } } }
    ],
    { new: true }
  )
}

const block = async (id, userId) => {
  const card = await Card.findById(id).populate({
    path: 'accountId',
    match: { userId }
  })

  if (!card?.accountId) return null

  card.isDeactivate = !card.isDeactivate
  return card.save()
}

module.exports = {
  create,
  getById,
  get,
  updateSpent,
  block
}
