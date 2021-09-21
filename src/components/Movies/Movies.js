import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';

const Movies = () => (
  <>
    <Header />
    <div className='page_movies'>
      <SearchForm />
    </div>
  </>
);

export default Movies;
