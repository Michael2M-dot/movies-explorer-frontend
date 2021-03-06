import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const SavedMovies = ({
  movieCards,
  onMovieDelete,
  onSearchMovie,
  searchInfoMessage,
  isLoading,
  inProcessing,
}) => (
  <>
    <Header>
      <Navigation />
    </Header>
    <div className='page_saved-movies'>
      <SearchForm
        onSearchMovie={onSearchMovie}
        isLoading={isLoading}
        searchInfoMessage={searchInfoMessage}
      />
      <MoviesCardList
        movieCards={movieCards}
        onMovieDelete={onMovieDelete}
        inProcessing={inProcessing}
      />
    </div>
    <Footer />
  </>
);

export default SavedMovies;
