import React, { useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormInputsValidate from '../../hooks/useForm';

const SearchForm = ({
  onClick,
  handleGetMovie,
}) => {
  const {
    values,
    errors,
    isValid = false,
    handleChange,
    resetForm,
  } = useFormInputsValidate();

  useEffect(() => {
    resetForm();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGetMovie(values.keyword);
    console.log(values.keyword);
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
          name='keyword'
          type='text'
          id='keyword'
          className='search-form__textfield'
          placeholder='Фильм'
          title='Введите название фильма'
          required
          minLength='2'
          pattern='^[A-Za-zА-Яа-яЁё\s]+$'
          onChange={handleChange}
          value={values.keyword || ''}
        />
         <span className='search-form__input-errors'>
          {errors.keyword || ''}
         </span>
        <button
          type='submit'
          className='search-form__button'
          // onClick={onClick}
          disabled={!isValid}
        >Найти
        </button>
      </label>
      <FilterCheckbox/>
    </form>
  );
};

export default SearchForm;
