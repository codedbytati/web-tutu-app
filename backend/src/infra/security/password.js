const crypto = require('crypto')
const { promisify } = require('util')

const scrypt = promisify(crypto.scrypt)
const KEY_LENGTH = 64

const hashPassword = async (password) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const derivedKey = await scrypt(password, salt, KEY_LENGTH)
  return `scrypt:${salt}:${derivedKey.toString('hex')}`
}

const verifyPassword = async (password, storedHash) => {
  const [algorithm, salt, key] = String(storedHash).split(':')
  if (algorithm !== 'scrypt' || !salt || !key) return false

  const derivedKey = await scrypt(password, salt, KEY_LENGTH)
  const storedKey = Buffer.from(key, 'hex')

  return (
    storedKey.length === derivedKey.length &&
    crypto.timingSafeEqual(storedKey, derivedKey)
  )
}

module.exports = { hashPassword, verifyPassword }
