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
    tags: '',
    
  };

  async componentDidUpdate(prevProps, prevState) {
    const { startLoader, stopLoader } = this;
    const { page, perPage, searchQuery } = this.state;
    if (page !== prevState.page || searchQuery !== prevState.searchQuery) {
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

  onSubmit = searchQuery => {
    if (searchQuery.trim() !== this.state.searchQuery) {
      this.setState(prev => ({searchQuery,
        items: [],
        page: 1,}));
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

  onImageClick = ({ largeImageURL, tags }) => {
    this.setState({tags,
      selectedImageUrl: largeImageURL,
    });
    this.showModal();
  };

  showModal = () => {
    this.setState({ isModalOpen: true });
  };

  hideModal = () => {
    this.setState({ isModalOpen: false });
  };

  // onModalClose = handleKeyDown => {
  //   handleKeyDown();
  // }

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // };

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // };

  render(){
  
    const {
      items,
      selectedImageUrl,
      page,
      totalPages,
      isModalOpen,
      isLoading,
      tags,
    } = this.state;
    
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
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
            tags={tags}
            onClick={this.onBackdropClick}
            handleKeyDown={this.handleKeyDown}
          />
        )}
      </>
    );
  };
};