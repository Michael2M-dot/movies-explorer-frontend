import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './MoviesCard/MoviesCard';

const Movies = () => (
  <>
    <Header />
    <div className='page_movies'>
      <SearchForm />
      <MoviesCardList>
        <MoviesCard/>
      </MoviesCardList>
    </div>
  </>
);

export default Movies;
