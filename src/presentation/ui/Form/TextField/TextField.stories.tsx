import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextField } from './index'

const meta = {
  title: 'UI/Form/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Campo de texto com label, placeholder, mensagem auxiliar e estado de validação. Aceita as propriedades nativas de um input HTML.'
      }
    }
  },
  args: { label: 'Nome', placeholder: 'Digite seu nome' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } }
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'Use seu nome completo' } }
export const Invalid: Story = {
  args: {
    label: 'E-mail',
    placeholder: 'voce@exemplo.com',
    isInvalid: true,
    errorMessage: 'Informe um e-mail válido'
  }
}
