import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './index'

const meta = {
  title: 'UI/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Componente tipográfico para títulos, corpo, legendas e textos auxiliares. `appearance` aplica a escala visual e escolhe uma tag semântica padrão.'
      }
    }
  },
  args: { appearance: 'body2', children: 'Texto de exemplo' },
  argTypes: {
    appearance: {
      control: 'select',
      options: [
        'display',
        'h1',
        'h2',
        'h3',
        'body1',
        'body2',
        'caption',
        'overline'
      ]
    }
  }
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TypographyScale: Story = {
  render: () => (
    <div className='grid gap-3'>
      <Text appearance='h1'>Título principal</Text>
      <Text appearance='h2'>Título secundário</Text>
      <Text appearance='h3'>Título terciário</Text>
      <Text appearance='body1'>Texto de corpo para leitura.</Text>
      <Text appearance='caption'>Legenda auxiliar</Text>
      <Text appearance='overline'>Overline</Text>
    </div>
  )
}
