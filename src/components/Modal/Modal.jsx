import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ url, onClick, onModalClose, tags }) => {
  useEffect(() => {
    window.addEventListener('keydown', onModalClose);
    return () => { 
      window.removeEventListener('keydown', this.onModalClose);
    }
  }, [onModalClose])
  
  return ReactDOM.createPortal(
    <Overlay onClick={onClick}>
      <ModalWindow>
        <img src={url} alt={tags} />
      </ModalWindow>
    </Overlay>,
    document.querySelector('#modal-root')
  );
};
