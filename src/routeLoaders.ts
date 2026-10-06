export const loadLogIn = () =>
  import('./pages/LogIn').then(({ LogIn }) => ({ default: LogIn }))
export const loadRegister = () =>
  import('./pages/Register').then(({ Register }) => ({ default: Register }))
export const loadHome = () =>
  import('./pages/Home').then(({ Home }) => ({ default: Home }))
export const loadPageNotFound = () =>
  import('./pages/PageNotFound').then(({ PageNotFound }) => ({
    default: PageNotFound
  }))
export const loadTransactions = () =>
  import('./pages/Transactions').then(({ Transactions }) => ({
    default: Transactions
  }))
export const loadProfile = () =>
  import('./pages/Profile').then(({ Profile }) => ({ default: Profile }))
export const loadAnalysis = () =>
  import('./pages/Analysis').then(({ Analysis }) => ({ default: Analysis }))
export const loadAccounts = () =>
  import('./pages/Accounts').then(({ Accounts }) => ({ default: Accounts }))

export const preloadRoutes = {
  '/': loadHome,
  '/transacoes': loadTransactions,
  '/analises': loadAnalysis,
  '/cartoes': loadAccounts,
  '/perfil': loadProfile
} as const
