import { lazy } from 'react'
import {
  loadAccounts,
  loadAnalysis,
  loadHome,
  loadLogIn,
  loadPageNotFound,
  loadProfile,
  loadRegister,
  loadTransactions
} from './loaders'

export const LogIn = lazy(loadLogIn)
export const Register = lazy(loadRegister)
export const Home = lazy(loadHome)
export const PageNotFound = lazy(loadPageNotFound)
export const Transactions = lazy(loadTransactions)
export const Profile = lazy(loadProfile)
export const Analysis = lazy(loadAnalysis)
export const Accounts = lazy(loadAccounts)
