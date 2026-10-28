import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './index'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Botão principal da interface. Use `variant` para indicar a intenção da ação e `size` para controlar sua escala. O botão também suporta estado desabilitado.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'positive', 'danger']
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg']
    }
  },
  args: {
    children: 'Continuar'
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-3'>
      <Button variant='primary'>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='ghost'>Ghost</Button>
      <Button variant='positive'>Positive</Button>
      <Button variant='danger'>Danger</Button>
    </div>
  )
}
