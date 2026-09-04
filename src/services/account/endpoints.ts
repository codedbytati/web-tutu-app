export default {
  getAccount: '/account',
  deactivateAccount: '/account/:accountId/block',
  getTransactions: '/account/transaction',
  createCard: '/account/card',
  deactivateCard: '/account/card/:cardId/block'
} as const
