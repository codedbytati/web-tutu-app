import type { Meta, StoryObj } from '@storybook/react-vite'
import { CurrencyField } from './index'

const meta = {
  title: 'UI/Form/CurrencyField',
  component: CurrencyField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Campo numérico para valores monetários em reais. Os dígitos digitados são formatados como moeda brasileira e `type` define a cor semântica do valor.'
      }
    }
  },
  args: { label: 'Valor', type: 'income', value: 12345 }
} satisfies Meta<typeof CurrencyField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Expense: Story = { args: { type: 'expense' } }
export const Invalid: Story = {
  args: { isInvalid: true, errorMessage: 'Informe um valor válido' }
}
