import React, { useEffect } from 'react';

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleClick}>
      <div className="modal">
        <img src={image.largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
