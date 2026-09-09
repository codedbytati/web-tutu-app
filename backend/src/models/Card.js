class Card {
  constructor({
    _id,
    bank,
    nickname,
    limit,
    spent = 0,
    available = Number(limit ?? 0) - Number(spent ?? 0),
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
    this.spent = spent
    this.available = Math.max(
      0,
      Number(limit ?? 0) - Number(spent ?? 0)
    )
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
