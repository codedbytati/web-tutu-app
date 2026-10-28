import type { Meta, StoryObj } from '@storybook/react-vite'
import { PasswordField } from './index'

const meta = {
  title: 'UI/Form/PasswordField',
  component: PasswordField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Campo para senhas com alternância integrada entre texto oculto e visível. Use `hint`, `errorMessage` e `isInvalid` para orientar a validação.'
      }
    }
  },
  args: {
    label: 'Senha',
    placeholder: 'Digite sua senha',
    hint: 'Mínimo de 8 caracteres'
  }
} satisfies Meta<typeof PasswordField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Invalid: Story = {
  args: { isInvalid: true, errorMessage: 'A senha informada é inválida' }
}
