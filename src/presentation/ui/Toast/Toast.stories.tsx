import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { GlobalToasts } from './index'
import { useToast } from './useToast'

const meta = {
  title: 'UI/Toast',
  component: GlobalToasts,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Região global para notificações temporárias. Enfileire mensagens com `useToast.add`, informando título, descrição opcional e status.'
      }
    }
  },
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof GlobalToasts>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: () => (
    <div className='flex flex-wrap gap-3'>
      <Button
        onClick={() => useToast.add({ title: 'Informação', status: 'info' })}
      >
        Informação
      </Button>
      <Button
        variant='positive'
        onClick={() =>
          useToast.add({
            title: 'Sucesso',
            description: 'Operação concluída.',
            status: 'success'
          })
        }
      >
        Sucesso
      </Button>
      <Button
        variant='danger'
        onClick={() =>
          useToast.add({
            title: 'Erro',
            description: 'Não foi possível concluir.',
            status: 'error'
          })
        }
      >
        Erro
      </Button>
      <GlobalToasts />
    </div>
  )
}
