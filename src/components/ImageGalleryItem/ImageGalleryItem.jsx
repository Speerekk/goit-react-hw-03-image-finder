import React from 'react';

const ImageGalleryItem = ({ image }) => {
  return (
    <div className="gallery-item">
      <img src={image.webformatURL} alt="" className="gallery-item__image" />
    </div>
  );
};

export default ImageGalleryItem;
