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
  }, [isValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      name='movie-search-form'
      id='movie-search-form'
      className='search-form'
      onSubmit={handleSubmit}
      autoComplete='off'
    >
      <label className='search-form__input'>
        <input
          name='request'
          type='text'
          id='request'
          className='search-form__textfield'
          placeholder='Фильм'
          title='Введите название фильма'
          required
          minLength='2'
          pattern='^[A-Za-zА-Яа-яЁё\s]+$'
          value={values.request}
          onChange={handleChange}
        />
         <span className='search-form__input-errors'>
          {errors.request || ''}
         </span>
        <button
          type='submit'
          className='search-form__button'
          // onClick={onClick}
          disabled={isValid}
        >Найти
        </button>
      </label>
      <FilterCheckbox/>
    </form>
  );
};

export default SearchForm;
