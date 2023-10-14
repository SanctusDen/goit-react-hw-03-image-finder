import React, {Component} from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export class Modal extends Component {
  

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.hideModal();
    }
  };

  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.hideModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  render() {
    return (
     <Overlay onClick={this.props.onClick}
        handleKeyDown={this.onBackdropClick}>
        <ModalWindow>
          <img src={this.props.url} alt={this.props.tags} />
        </ModalWindow>
      </Overlay>,
      document.querySelector('#modal-root')
  )
  };
};