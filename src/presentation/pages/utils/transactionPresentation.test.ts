import { describe, expect, it } from 'vitest'
import type { TransactionModel } from '@tutu-domain'
import { getTransactionDescription } from './transactionPresentation'

const transaction = (
  overrides: Partial<TransactionModel>
): TransactionModel => ({
  id: 'transaction-id',
  accountId: 'account-id',
  type: 'DEBIT',
  value: -60,
  date: '2026-10-27',
  ...overrides
})

describe('getTransactionDescription', () => {
  it('removes surrounding whitespace from user descriptions', () => {
    expect(
      getTransactionDescription(transaction({ description: '  Internet  ' }))
    ).toBe('Internet')
  })

  it('provides a fallback for transfers without descriptions', () => {
    expect(
      getTransactionDescription(
        transaction({ type: 'TRANSFER', from: 'Conta', to: 'Poupança' })
      )
    ).toBe('Conta para Poupança')
  })
})
