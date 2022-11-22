import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalery } from './ImageGallery/ImageGallery';
import css from './App.module.css';

export const App = () => {
  const [inputValue, setInputValue] = useState('');

  const onSubmitFormHandler = inputValue => {
    if (inputValue) {
      setInputValue(inputValue);
    }
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmitHandler={onSubmitFormHandler} />
      <ImageGalery inputValue={inputValue} />
    </div>
  );
};
