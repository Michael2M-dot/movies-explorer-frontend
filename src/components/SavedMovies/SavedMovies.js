import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const SavedMovies = ({
  movieCards,
  onMovieDelete,
  onMovieLike,
}) => (
  <>
    <Header>
      <Navigation />
    </Header>
    <div className='page_saved-movies'>
      <SearchForm />
      <MoviesCardList
        movieCards={movieCards}
        onMovieDelete={onMovieDelete}
        onMovieLike={onMovieLike}
      />
      <Preloader />
    </div>
    <Footer />
  </>
);

export default SavedMovies;
