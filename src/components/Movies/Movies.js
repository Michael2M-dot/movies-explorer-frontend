import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './MoviesCard/MoviesCard';
import MoviesPreloader from './Preloader/Preloader';
import Footer from '../Footer/Footer';

const Movies = () => (
  <>
    <Header />
    <div className='page_movies'>
      <SearchForm />
      <MoviesCardList>
        <MoviesCard/>
      </MoviesCardList>
      <MoviesPreloader />
    </div>
    <Footer />
  </>
);

export default Movies;
