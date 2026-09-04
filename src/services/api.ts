// src/services/api.ts
import axios from 'axios';
import { auth } from '../services/firebase';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export type TransactionType = 'Debit' | 'Credit' | 'Transfer';

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  value: number;
  from?: string;
  to?: string;
  date: string;
}

export interface Account {
  id: string;
  bank?: string;
  nickname?: string;
  balance?: number;
  type: string;
}

export interface AccountResponse {
  result: {
    account: Account[];
    transactions: Transaction[];
    cards: Card[];
  };
}

export interface Card {
  id: string;
  accountId: string;
  bank: string;
  nickname: string;
  name?: string;
  limit: number;
  type: string;
}

export interface CreateCardInput {
  bank: string;
  nickname: string;
  limit: number;
}

export interface CreateAccountInput {
  bank: string;
  nickname: string;
  type: string;
  balance: number;
}

export interface CreateTransactionInput {
  accountId: string;
  value: number;
  type: TransactionType;
  from?: string;
  to?: string;
}

export const getAccount = async () => {
  const { data } = await api.get<AccountResponse>('/account');
  return data.result;
};

export const createTransaction = async (transaction: CreateTransactionInput) => {
  const { data } = await api.post<{ result: Transaction }>('/account/transaction', transaction);
  return data.result;
};

export const createCard = async (card: CreateCardInput) => {
  const { data } = await api.post<{ result: Card }>('/account/card', card);
  return data.result;
};

export const createAccount = async (account: CreateAccountInput) => {
  const { data } = await api.post<{ result: Account }>('/account', account);
  return data.result;
};

api.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser;
  
  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});