import { useEffect } from 'react';
import './modal.scss';
import { createPortal } from 'react-dom';

const menuWrapper = document.getElementById('modal') as HTMLElement;

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: Props) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div
      className='Modal__overlay'
      onClick={(e) => {
        e.stopPropagation();
        console.log('click');

        onClose();
      }}
    >
      <div
        className='Modal__wrapper'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    menuWrapper
  );
}
