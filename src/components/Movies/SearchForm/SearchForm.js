import React from 'react';

const SearchForm = (
  onClick,
) => (
  <section className='search-form'>
    <label className='search-form__input'>
      <input
        className='search-form__textfield'
        placeholder='Фильм'
      />
      <button
        className='search-form__button'
        onClick={onClick}
      >Найти</button>
    </label>
    <div className='search-form__toggle' />
  </section>
);

export default SearchForm;
