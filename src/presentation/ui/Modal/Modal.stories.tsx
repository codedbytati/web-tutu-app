import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Modal } from './index'

const meta = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Janela modal para fluxos que exigem foco do usuário. Componha o conteúdo usando `Modal.Header`, `Modal.Body` e `Modal.Footer`.'
      }
    }
  },
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir modal</Button>
      <Modal isOpen={isOpen}>
        <Modal.Header onClose={() => setIsOpen(false)}>
          Confirmar ação
        </Modal.Header>
        <Modal.Body>Deseja continuar com esta operação?</Modal.Body>
        <Modal.Footer
          primaryButtonLabel='Confirmar'
          secondaryButtonLabel='Cancelar'
          onPrimaryButtonClick={() => setIsOpen(false)}
          onSecondaryButtonClick={() => setIsOpen(false)}
        />
      </Modal>
    </>
  )
}

export const Default: Story = { render: () => <ModalExample /> }
