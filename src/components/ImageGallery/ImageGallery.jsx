import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <div className="gallery">
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageGallery;
