import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './index'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Etiqueta compacta para comunicar status, categoria ou estado de um item. As cores representam diferentes significados semânticos.'
      }
    }
  },
  args: { label: 'Ativo', color: 'green', isActiveData: true },
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'green', 'red', 'yellow', 'gray']
    }
  }
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors: Story = {
  render: () => (
    <div className='flex flex-wrap gap-3'>
      <Badge label='Informação' color='blue' isActiveData />
      <Badge label='Ativo' color='green' isActiveData />
      <Badge label='Cancelado' color='red' isActiveData />
      <Badge label='Pendente' color='yellow' isActiveData />
      <Badge label='Indefinido' color='gray' />
    </div>
  )
}
