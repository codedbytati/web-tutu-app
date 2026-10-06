class User {
  constructor({ _id, username, email, password }) {
    this.username = username
    this.email = email
    this.password = password
    this.id = _id
  }

  isValid() {
    return this.username && this.email && this.password
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email
    }
  }
}

module.exports = User
