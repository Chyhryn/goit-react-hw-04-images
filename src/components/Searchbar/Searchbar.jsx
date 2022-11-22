import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { HiSearch } from 'react-icons/hi';

export const Searchbar = ({ onSubmitHandler }) => {
  const [inputValue, setInputValue] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      alert('The fild can`t be empty!');
      return;
    }
    onSubmitHandler(inputValue);
    setInputValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <HiSearch className={css.SearchForm_button_label} />
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
};
