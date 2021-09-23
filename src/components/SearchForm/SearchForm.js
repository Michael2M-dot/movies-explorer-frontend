import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

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
    <FilterCheckbox />
  </section>
);

export default SearchForm;
