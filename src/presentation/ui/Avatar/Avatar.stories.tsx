import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './index'

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Exibe as iniciais de uma pessoa em um avatar circular. Use `name` para gerar as iniciais e `size` para ajustar a dimensão.'
      }
    }
  },
  args: { name: 'Ana Silva', size: 'lg' },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] }
  }
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} name='Ana Silva' size={size} />
      ))}
    </div>
  )
}
