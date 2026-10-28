import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <div className='min-w-80 rounded-2xl bg-background p-6 text-foreground'>
        <Story />
      </div>
    )
  ]
} satisfies Preview

export default preview
