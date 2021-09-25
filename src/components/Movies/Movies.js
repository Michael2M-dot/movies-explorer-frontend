import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesPreloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const Movies = ({
  movieCards,
  onMovieDelete,
  onMovieLike,
}) => (
  <>
    <Header>
      <Navigation />
    </Header>
    <div className='page_movies'>
      <SearchForm />
      <MoviesCardList
        movieCards={movieCards}
        onMovieDelete={onMovieDelete}
        onMovieLike={onMovieLike}
      />
      <MoviesPreloader />
    </div>
    <Footer />
  </>
);

export default Movies;
