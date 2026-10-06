const createRateLimiter = ({ windowMs, max }) => {
  const attempts = new Map()

  return (req, res, next) => {
    const key = req.ip || req.socket.remoteAddress || 'unknown'
    const now = Date.now()
    const current = attempts.get(key)

    if (!current || now - current.startedAt >= windowMs) {
      attempts.set(key, { startedAt: now, count: 1 })
      return next()
    }

    current.count += 1
    if (current.count > max) {
      res.setHeader('Retry-After', Math.ceil((windowMs - (now - current.startedAt)) / 1000))
      return res.status(429).json({ message: 'Muitas tentativas. Tente novamente mais tarde.' })
    }

    return next()
  }
}

const securityHeaders = (_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  return next()
}

module.exports = { createRateLimiter, securityHeaders }
