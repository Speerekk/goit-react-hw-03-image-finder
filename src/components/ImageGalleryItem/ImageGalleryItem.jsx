import React from 'react';

const ImageGalleryItem = ({ image }) => {
  return (
    <li className="gallery-item">
      <img
        src={image.webformatURL}
        alt=""
        className="gallery-item__image"
        style={{ height: '300px' }}
      />
    </li>
  );
};

export default ImageGalleryItem;
