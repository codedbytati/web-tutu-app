import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select, SelectItem } from './index'

const meta = {
  title: 'UI/Form/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Campo de seleção para escolher uma opção entre categorias. Combine `Select` com `SelectItem` para declarar as opções disponíveis.'
      }
    }
  },
  args: { label: 'Categoria', placeholder: 'Selecione uma categoria' }
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const options = (
  <>
    <SelectItem value='food'>Alimentação</SelectItem>
    <SelectItem value='transport'>Transporte</SelectItem>
  </>
)

export const Default: Story = {
  render: (args) => <Select {...args}>{options}</Select>
}
export const Invalid: Story = {
  args: { isInvalid: true, errorMessage: 'Selecione uma categoria' },
  render: (args) => <Select {...args}>{options}</Select>
}
