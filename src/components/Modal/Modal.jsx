import ReactDOM from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ url, onClick, tags }) => {

  ComponentDidMount() {
    try {
      window.addEventListener('keydown', onModalClose);
    }
    catch (error) {
      console.log(error);
    }
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onModalClose);
  };
 
  return ReactDOM.createPortal(
    <Overlay onClick={onClick}>
      <ModalWindow>
        <img src={url} alt={tags} />
      </ModalWindow>
    </Overlay>,
    document.querySelector('#modal-root')
  );
};
