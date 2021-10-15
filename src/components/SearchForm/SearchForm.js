import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormInputsValidate from '../../hooks/useForm';
import Preloader from '../Preloader/Preloader';
import CurrentUserContext from '../../context/CurrentUserContext';

const SearchForm = ({
  handleGetMovie,
  onSearchMovie,
  isLoading,
  infoMessage,
}) => {
  const {
    values,
    errors,
    isValid = false,
    handleChange,
    resetForm,
  } = useFormInputsValidate();
  const isMovie = useRouteMatch({ path: '/movies', exact: true });

  const { currentUser } = useContext(CurrentUserContext);

  const [isShowShortMovie, setShowShortMovie] = useState(currentUser.shortMovieBoolean);

  const searchDirection = isMovie ? handleGetMovie : onSearchMovie;

  const inputValue = isMovie ? currentUser.keyword : '';

  useEffect(() => {
    resetForm({ keyword: inputValue }, {}, false);
  }, [resetForm]);

  const handleShowShortMovie = () => {
    setShowShortMovie(!isShowShortMovie);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchDirection(values.keyword, isShowShortMovie);
  };

  return (
    <>
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
            disabled={!isValid}
          >Найти
          </button>
        </label>
        <FilterCheckbox
        onClick={handleShowShortMovie}
        isShowShortMovie={isShowShortMovie || false}
        />
      </form>
      {isLoading && (
        <Preloader/>
      )}
      {infoMessage && (<span className='movie__span'>
        {infoMessage || ''}
      </span>)}
    </>
  );
};

export default SearchForm;
