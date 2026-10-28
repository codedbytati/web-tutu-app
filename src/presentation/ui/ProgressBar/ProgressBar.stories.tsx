import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar } from './index'

const meta = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Indicador visual de progresso. A propriedade `percentage` representa o valor atual entre 0 e 100.'
      }
    }
  },
  args: { percentage: 75 },
  argTypes: { percentage: { control: { type: 'number', min: 0, max: 100 } } }
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ProgressStates: Story = {
  render: () => (
    <div className='grid w-80 gap-3'>
      <ProgressBar percentage={25} />
      <ProgressBar percentage={75} />
      <ProgressBar percentage={100} />
    </div>
  )
}
