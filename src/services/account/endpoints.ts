export default {
  getAccount: '/account',
  deactivateAccount: '/account/:accountId/block',
  createCard: '/account/card',
  deactivateCard: '/account/card/:cardId/block'
} as const
