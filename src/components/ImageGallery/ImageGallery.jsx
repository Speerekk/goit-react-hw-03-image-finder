import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;

    return (
      <ul className="gallery">
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onImageClick={onImageClick} // Передає onImageClick у ImageGalleryItem
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
