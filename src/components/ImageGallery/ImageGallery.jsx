import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';

import css from './ImageGallery.module.css';

const API_KEY = '30283043-1910684de39b526132f1cde56';
const BASE_URL = 'https://pixabay.com/api/?';

export const ImageGalery = ({ inputValue }) => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const onClickHandler = () => {
    setPage(prevPage => {
      return prevPage + 1;
    });
  };

  useEffect(() => {
    if (inputValue.trim() === '') {
      return;
    }
    setQuery(inputValue);
    setPage(1);
    setImages([]);
    setStatus('pending');
  }, [inputValue]);

  useEffect(() => {
    const getImages = () => {
      fetch(
        `${BASE_URL}q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Something wrong with this request ${query}`)
          );
        })
        .then(({ hits }) => {
          if (hits.length === 0) {
            return Promise.reject(
              new Error(`There is no images for this query ${query}!`)
            );
          }
          const imagesList = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return {
                id,
                webformatURL,
                largeImageURL,
                tags,
              };
            }
          );
          return imagesList;
        })
        .then(imagesList => {
          setImages(prevImages => [...prevImages, ...imagesList]);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error.message);
          setStatus('rejected');
        });
    };

    getImages();
  }, [query, page]);

  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'rejected') {
    return <div className={css.Error}>{error}</div>;
  }
  if (status === 'resolved') {
    return (
      <>
        <ul className={css.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            );
          })}
        </ul>
        <Button onClick={onClickHandler}>Load More</Button>
      </>
    );
  }
};

ImageGalery.propTypes = {
  inputValue: PropTypes.string.isRequired,
};
