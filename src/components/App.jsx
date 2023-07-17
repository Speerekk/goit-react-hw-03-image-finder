import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

const API_KEY = '36809568-a0d5a67efa5c37ce2fdc5564f';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      images: [],
      page: 1,
      isLoading: false,
      selectedImage: null,
      hasMore: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ page: 1, images: [], hasMore: true }, () => {
        this.fetchImages();
      });
    }
  }

  handleSearchSubmit = query => {
    this.setState({ searchQuery: query });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchImages();
      }
    );
  };

  handleOpenModal = imageURL => {
    this.setState({ selectedImage: imageURL });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    if (searchQuery.trim() === '') {
      return;
    }

    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=12`
      )
      .then(response => {
        if (response.data.hits.length === 0) {
          this.setState({ hasMore: false });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
          }));
        }
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { images, isLoading, selectedImage, hasMore } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onImageClick={this.handleOpenModal} />
        {images.length > 0 && !isLoading && hasMore && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        {selectedImage && (
          <Modal imageURL={selectedImage} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

App.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  selectedImage: PropTypes.object,
  hasMore: PropTypes.bool.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  fetchImages: PropTypes.func.isRequired,
};

export default App;
