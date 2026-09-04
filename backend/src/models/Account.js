class Account {
  constructor({
    _id,
    bank,
    nickname,
    balance = 0,
    type,
    isDeactivate = false,
    userId
  }) {
    this.id = _id
    this.bank = bank
    this.nickname = nickname
    this.balance = balance
    this.type = type
    this.isDeactivate = isDeactivate
    this.userId = userId
  }
}

module.exports = Account
