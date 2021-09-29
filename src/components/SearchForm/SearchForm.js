import React, { useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormInputsValidate from '../../hooks/useForm';

const SearchForm = (
  onClick,
) => {
  const {
    values,
    errors,
    isValid = false,
    handleChange,
    resetForm,
  } = useFormInputsValidate();

  useEffect(() => {
    resetForm();
  }, [onClick]);

  return (
    <section className='search-form'>
      <label className='search-form__input'>
        <input
          className='search-form__textfield'
          placeholder='Фильм'
          required
          minLength='2'
          type='text'
          value={values.request}
          onChange={handleChange}
        />
        <span className='search-form__input-errors'>
          {errors || ''}
        </span>
        <button
          type='submit'
          className='search-form__button'
          onClick={onClick}
          disabled={!isValid}
        >Найти</button>
      </label>
      <FilterCheckbox />
    </section>
  );
};

export default SearchForm;
