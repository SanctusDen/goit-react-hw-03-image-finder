import ReactDOM from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ url, onClick, onModalClose }) => {
  window.addEventListener('keydown', onModalClose);
  return ReactDOM.createPortal(
    <Overlay onClick={onClick}>
      <ModalWindow>
        <img src={url} alt="" />
      </ModalWindow>
    </Overlay>,
    document.querySelector('#modal-root')
  );
};
