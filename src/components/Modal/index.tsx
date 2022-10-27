import React from 'react'
import './index.scss'

type ModalType = {
  title: string, 
  content: React.ReactElement, 
  footer: React.ReactElement, 
  onClose: () => void, 
  isVisible: boolean
}

const Modal: React.FC<ModalType> = ({
  isVisible,
  title,
  content,
  footer,
  onClose
 }) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      onClose()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', onKeydown)

    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  })
  return (
    isVisible ? (
      <div className='modal' onClick={onClose}>
        <div className='modal-dialog' onClick={e => e.stopPropagation()}>
          <header>
            <span className='modal-title'>{title}</span>
            <span className='modal-close' onClick={onClose}>x</span>
          </header>
          <main>
            {content}
          </main>
          {footer && <footer>{footer}</footer>}
        </div>
      </div>
    ) : null
  )
}

export default Modal