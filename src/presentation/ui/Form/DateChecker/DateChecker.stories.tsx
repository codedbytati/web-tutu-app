import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateChecker } from './index'

const meta = {
  title: 'UI/Form/DateChecker',
  component: DateChecker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Campo de data com label, mensagens de apoio e estado de erro. Mantém a API nativa de um input do tipo `date`.'
      }
    }
  },
  args: { label: 'Data', defaultValue: '2026-10-27' }
} satisfies Meta<typeof DateChecker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Invalid: Story = {
  args: { isInvalid: true, errorMessage: 'Informe uma data válida' }
}
