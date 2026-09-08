class DetailedAccount {
  constructor({
    _id,
    type,
    value,
    description,
    from,
    to,
    category,
    date,
    accountId,
    anexo,
    urlAnexo
  }) {
    this.id = _id
    this.accountId = accountId
    this.type = type
    this.value = value
    this.description = description || to || from
    this.from = from
    this.to = to
    this.category = category
    this.date = date
    this.anexo = anexo
    this.urlAnexo = urlAnexo
  }
}

module.exports = DetailedAccount
