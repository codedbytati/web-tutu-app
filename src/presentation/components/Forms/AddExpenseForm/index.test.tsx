import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AddExpenseForm } from './index'

vi.mock('../AccountOptions', () => ({
  AccountOptions: () => <option value='account:test'>Conta de teste</option>
}))

describe('AddExpenseForm', () => {
  it('renders the required expense fields and action', () => {
    const { container } = render(
      <AddExpenseForm
        onSubmit={vi.fn()}
        onDescriptionProps={{}}
        onDateProps={{}}
        onValueProps={{}}
        onCategoryProps={{}}
        onSourceIdProps={{}}
      />
    )

    expect(screen.getByLabelText('Descrição')).toBeInTheDocument()
    expect(screen.getByLabelText('Data da transação')).toBeInTheDocument()
    expect(screen.getByLabelText('Valor')).toBeInTheDocument()
    expect(screen.getByLabelText('Categoria')).toBeInTheDocument()
    expect(screen.getByLabelText('Conta')).toBeInTheDocument()
    expect(container.querySelector('input[type="date"]')).toBeInTheDocument()
    expect(screen.getByText('Registrar despesa')).toBeInTheDocument()
  })
})
