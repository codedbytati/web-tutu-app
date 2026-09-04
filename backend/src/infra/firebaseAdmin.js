const admin = require('firebase-admin')

const getCredential = () => {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    const json = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8')
    return admin.credential.cert(JSON.parse(json))
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON))
  }

  return null
}

const credential = getCredential()

if (credential && !admin.apps.length) {
  admin.initializeApp({ credential })
}

module.exports = admin.apps.length ? admin.auth() : null
