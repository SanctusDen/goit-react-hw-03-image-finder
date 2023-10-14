import ReactDOM from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ url, onClick, tags }) => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  const onBackdropClick = e => {
    const { hideModal } = this;
    if (e.target.nodeName !== 'IMG') {
      hideModal();
    }
  };

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // };

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // };
  
  return ReactDOM.createPortal(
    <Overlay onClick={onClick}
      handleKeyDown={handleKeyDown}>
      <ModalWindow
        handleBackdropClick={onBackdropClick}>
        <img src={url} alt={tags} />
      </ModalWindow>
    </Overlay>,
    document.querySelector('#modal-root')
  );
};