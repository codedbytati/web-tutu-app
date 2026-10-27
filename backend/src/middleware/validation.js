const mongoose = require('mongoose')

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value)

const validateObjectIdParam = (paramName) => (req, res, next) => {
  if (!isValidObjectId(req.params[paramName])) {
    return res.status(404).json({ message: 'Recurso não encontrado' })
  }

  return next()
}

const isOptionalString = (value, maxLength) =>
  value === undefined ||
  (typeof value === 'string' && value.trim().length <= maxLength)

const isRequiredString = (value, maxLength) =>
  typeof value === 'string' &&
  value.trim().length > 0 &&
  value.trim().length <= maxLength

const validateAccount = (req, res, next) => {
  const { bank, nickname, type, balance } = req.body || {}
  const parsedBalance =
    typeof balance === 'string'
      ? Number(balance.replace(/\./g, '').replace(',', '.'))
      : Number(balance ?? 0)

  if (
    !isRequiredString(bank, 120) ||
    !isRequiredString(nickname, 120) ||
    !['CURRENT', 'SAVINGS', 'INVESTMENT'].includes(type) ||
    !Number.isFinite(parsedBalance)
  ) {
    return res.status(400).json({ message: 'Dados da conta inválidos' })
  }

  return next()
}

const validateCard = (req, res, next) => {
  const { bank, nickname, limit } = req.body || {}
  const parsedLimit =
    typeof limit === 'string'
      ? Number(limit.replace(/\./g, '').replace(',', '.'))
      : Number(limit)

  if (
    !isRequiredString(bank, 120) ||
    !isRequiredString(nickname, 120) ||
    !Number.isFinite(parsedLimit) ||
    parsedLimit < 0
  ) {
    return res.status(400).json({ message: 'Dados do cartão inválidos' })
  }

  return next()
}

const validateTransaction =
  ({ partial = false } = {}) =>
  (req, res, next) => {
    const body = req.body
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({ message: 'Dados inválidos' })
    }

    const has = (key) => Object.prototype.hasOwnProperty.call(body, key)
    const editableFields = [
      'value',
      'type',
      'description',
      'from',
      'to',
      'category',
      'anexo',
      'urlAnexo',
      'urlanexo',
      'date'
    ]
    const hasEditableField = editableFields.some(has)
    const value = body.value
    const parsedValue =
      typeof value === 'string'
        ? Number(value.replace(/\./g, '').replace(',', '.'))
        : Number(value)
    const validDate =
      body.date === undefined ||
      (typeof body.date === 'string' &&
        Number.isFinite(new Date(body.date).getTime()))

    if (
      (!partial && (value === undefined || body.type === undefined)) ||
      (partial && !hasEditableField) ||
      (has('value') && (!Number.isFinite(parsedValue) || parsedValue <= 0)) ||
      (has('type') &&
        (typeof body.type !== 'string' ||
          !['DEBIT', 'CREDIT', 'TRANSFER'].includes(
            body.type.toUpperCase()
          ))) ||
      !validDate ||
      !isOptionalString(body.description, 500) ||
      !isOptionalString(body.from, 200) ||
      !isOptionalString(body.to, 200) ||
      !isOptionalString(body.category, 30) ||
      !isOptionalString(body.anexo, 500) ||
      !isOptionalString(body.urlAnexo, 2048) ||
      !isOptionalString(body.urlanexo, 2048) ||
      !isOptionalString(body.accountId, 100) ||
      !isOptionalString(body.sourceId, 100) ||
      !isOptionalString(body.destinationId, 100)
    ) {
      return res.status(400).json({ message: 'Dados da transação inválidos' })
    }

    return next()
  }

module.exports = {
  isValidObjectId,
  validateAccount,
  validateCard,
  validateObjectIdParam,
  validateTransaction
}
