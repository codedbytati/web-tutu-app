const DetailedAccountModel = require('../../models/DetailedAccount')

const updateTransaction = async ({
  transactionId,
  updates = {},
  repository
}) => {
  const currentTransaction = await repository.getById(transactionId)
  if (!currentTransaction) return null

  const dataToPersist = { ...updates }
  if (dataToPersist.type) {
    dataToPersist.type = String(dataToPersist.type).toUpperCase()
  }
  const receivedValue = Object.prototype.hasOwnProperty.call(
    dataToPersist,
    'value'
  )

  if (receivedValue) {
    const effectiveType = dataToPersist.type ?? currentTransaction.type
    const shouldReverseValue =
      (effectiveType === 'DEBIT' && dataToPersist.value > 0) ||
      (effectiveType === 'CREDIT' && dataToPersist.value < 0)

    if (shouldReverseValue) {
      dataToPersist.value = dataToPersist.value * -1
    }
  }

  const result = await repository.updateById(transactionId, dataToPersist)
  if (!result) return null

  const plainResult = result.toJSON ? result.toJSON() : result
  return new DetailedAccountModel(plainResult)
}

module.exports = updateTransaction
