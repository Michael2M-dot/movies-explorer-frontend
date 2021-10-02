import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import Preloader from '../Preloader/Preloader';

const Movies = ({
  movieCards,
  onMovieLike,
  showMoreMovie,
  isLoading,
  handleGetMovie,
}) => (
  <>
    <Header>
      <Navigation />
    </Header>
    <div className='page_movies'>
      <SearchForm
      handleGetMovie={handleGetMovie}
      />
      {isLoading && (
        <Preloader/>
      )}
      <MoviesCardList
        movieCards={movieCards}
        onMovieLike={onMovieLike}
        showMoreMovie={showMoreMovie}
      />
    </div>
    <Footer />
  </>
);

export default Movies;
