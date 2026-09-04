
class Account {
    constructor({ _id, bank, nickname, balance = 0, type, userId}){
        this.id = _id
        this.bank = bank
        this.nickname = nickname
        this.balance = balance
        this.type= type
        this.userId = userId
    }
}

module.exports = Account