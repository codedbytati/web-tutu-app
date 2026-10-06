export const loadLogIn = () =>
  import('../presentation/pages/LogIn').then(({ LogIn }) => ({ default: LogIn }))
export const loadRegister = () =>
  import('../presentation/pages/Register').then(({ Register }) => ({ default: Register }))
export const loadHome = () =>
  import('../presentation/pages/Home').then(({ Home }) => ({ default: Home }))
export const loadPageNotFound = () =>
  import('../presentation/pages/PageNotFound').then(({ PageNotFound }) => ({
    default: PageNotFound
  }))
export const loadTransactions = () =>
  import('../presentation/pages/Transactions').then(({ Transactions }) => ({
    default: Transactions
  }))
export const loadProfile = () =>
  import('../presentation/pages/Profile').then(({ Profile }) => ({ default: Profile }))
export const loadAnalysis = () =>
  import('../presentation/pages/Analysis').then(({ Analysis }) => ({ default: Analysis }))
export const loadAccounts = () =>
  import('../presentation/pages/Accounts').then(({ Accounts }) => ({ default: Accounts }))

export const preloadRoutes = {
  '/': loadHome,
  '/transacoes': loadTransactions,
  '/analises': loadAnalysis,
  '/cartoes': loadAccounts,
  '/perfil': loadProfile
} as const
