class Card {
  constructor({
    _id,
    bank,
    nickname,
    limit,
    type,
    isDeactivate = false,
    number,
    dueDate,
    functions,
    cvc,
    paymentDate,
    name,
    accountId
  }) {
    this.id = _id
    this.bank = bank
    this.nickname = nickname
    this.limit = limit
    this.accountId = accountId
    this.type = type
    this.isDeactivate = isDeactivate
    this.number = number
    this.dueDate = dueDate
    this.functions = functions
    this.cvc = cvc
    this.paymentDate = paymentDate
    this.name = name
  }
}

module.exports = Card
