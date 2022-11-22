import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onModalShow = () => {
    setLargeImage(largeImageURL);
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          onClick={onModalShow}
          className={css.ImageGalleryItem_image}
          src={webformatURL}
          alt={tags}
        />
      </li>
      {showModal && (
        <Modal
          onClose={() => setShowModal(prevShowModal => !prevShowModal)}
          largeImage={largeImage}
          tags={tags}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
