import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({
  movieCards,
  onMovieDelete,
  isLoading,
  onSearchMovie,
  infoMessage,
}) => (
  <>
    <Header>
      <Navigation />
    </Header>
    <div className='page_saved-movies'>
      <SearchForm
        onSearchMovie={onSearchMovie}
        isLoading={isLoading}
        infoMessage={infoMessage}
      />
      <MoviesCardList
        movieCards={movieCards}
        onMovieDelete={onMovieDelete}
      />
    </div>
    <Footer />
  </>
);

export default SavedMovies;
