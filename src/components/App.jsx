import React, { Component } from "react";
import { fetchImages } from "services/api";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {
  state = {
    searchQuery: '',
    items: [],
    page: 1,
    totalPages: null,
    perPage: 12,
    selectedImageUrl: null,
    isModalOpen: false,
    isLoading: false,
    error: null,
  };

   async componentDidUpdate(prevProps, prevState) {
    const { startLoader, stopLoader } = this;
    const { page, perPage, searchQuery } = this.state;
    if(page !== prevState.page || this.state.searchQuery!== prevState.searchQuery ){
         try {
        startLoader();
        const response = await fetchImages(searchQuery, page, perPage);
        const {
          data: { hits: items, totalHits },
        } = response;
        const totalPages = Math.ceil(totalHits / perPage);

        this.setState(state => {
          return { items: [...state.items, ...items], totalPages };
        });
      } catch (error) {
        console.log(error);
      } finally {
        stopLoader();
      }
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      search: { value: searchQuery },
    } = e.target.elements;
    if (searchQuery.trim() === '') {
      return;
    }
    if (searchQuery.trim() !== this.state.searchQuery) {
      this.setState({
        searchQuery,
        items: [],
        page: 1,
      });
    }
  };

  startLoader = () => {
    this.setState({ isLoading: true });
  };

  stopLoader = () => {
    this.setState({ isLoading: false });
  };

  onLoadMore = () => {
    this.setState(state => {
      return { page: state.page + 1 };
    });
  };

  onImageClick = e => {
    const { id } = e.currentTarget;
    const { items } = this.state;
    const largeImageURL = [...items]
      .filter(item => item.id === Number(id))
      .map(obj => obj.largeImageURL)
      .join('');
    const selectedImageUrl = largeImageURL;
    this.setState({ selectedImageUrl });
    this.showModal();
  };

  showModal = () => {
    this.setState({ isModalOpen: true });
  };

  hideModal = () => {
    this.setState({ isModalOpen: false });
  };

  onModalClose = e => {
    if (e.key === 'Escape') {
      this.hideModal();
    }
  };
  
  onBackdropClick = e => {
    const { hideModal } = this;
    if (e.target.nodeName !== 'IMG') {
      hideModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onModalClose);
  };

  render() {
    const {
      items,
      selectedImageUrl,
      page,
      totalPages,
      isModalOpen,
      isLoading,
    } = this.state;
    return (
      <>
        <Searchbar onSubmit={ this.onSubmit} />
        <ImageGallery
          images={items}
          onClick={this.onImageClick}></ImageGallery>
        {items.length > 1 && page > 0 && page < totalPages && !isLoading && (
          <Button onClick={this.onLoadMore} />
        )}
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal
            url={selectedImageUrl}
            onClick={this.onBackdropClick}
            onModalClose={this.onModalClose}
          />
        )}
      </>
    )
  }
};