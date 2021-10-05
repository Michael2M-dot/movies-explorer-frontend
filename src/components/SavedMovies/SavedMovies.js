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
}) => (
  <>
    <Header>
      <Navigation />
    </Header>
    <div className='page_saved-movies'>
      <SearchForm />
      {isLoading && (
        <Preloader/>
      )}
      <MoviesCardList
        movieCards={movieCards}
        onMovieDelete={onMovieDelete}
      />
    </div>
    {isLoading && (<Preloader/>)}
    <Footer />
  </>
);

export default SavedMovies;
