const DetailedAccountModel = require('../../models/DetailedAccount')

const saveTransaction = async ({ transaction, repository }) => {
  transaction.type = String(transaction.type).toUpperCase()
  const shouldReverseValue =
    (transaction.type === 'DEBIT' && transaction.value > 0) ||
    (transaction.type === 'CREDIT' && transaction.value < 0)
  if (shouldReverseValue) transaction.value = transaction.value * -1

  const resultado = await repository.create(transaction)
  return new DetailedAccountModel(resultado.toJSON())
}

module.exports = saveTransaction
