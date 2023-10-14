import ReactDOM from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ url, onClick, tags }) => {
  const  onModalClose = e => {
    if (e.key === 'Escape') {
      this.hideModal();
    }
  };

  // ComponentDidMount(); {;
  //   window.addEventListener('keydown', onModalClose);
  // };

  // componentWillUnmount(); {
  //   window.removeEventListener('keydown', this.onModalClose);
  // };
 
  return ReactDOM.createPortal(
    <Overlay onClick={onClick}>
      <ModalWindow>
        <img src={url} alt={tags} />
      </ModalWindow>
    </Overlay>,
    document.querySelector('#modal-root')
  );
};
