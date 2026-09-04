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

  card.isDeactivate = !card.isDeactivate
  return card.save()
}

module.exports = {
  create,
  getById,
  get,
  block
}
