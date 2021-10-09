import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const Movies = ({
  movieCards,
  onMovieAdd,
  onMovieDelete,
  showMoreMovie,
  isLoading,
  handleGetMovie,
  infoMessage,
  inProcessing,
}) => (
  // определяем массив карточек из последнего поискового запроса
  // const lastSearchResult = JSON.parse(localStorage.getItem('movieSearchedCards'));
  // const movieRenderCards = movieCards.length !== 0 ? lastSearchResult : movieCards;
  <>
    <Header>
      <Navigation />
    </Header>
    <div className='page_movies'>
      <SearchForm
        handleGetMovie={handleGetMovie}
        movieCards={movieCards}
        isLoading={isLoading}
        infoMessage={infoMessage}
      />
      <MoviesCardList
        movieCards={movieCards}
        onMovieAdd={onMovieAdd}
        showMoreMovie={showMoreMovie}
        onMovieDelete={onMovieDelete}
        inProcessing={inProcessing}
      />
    </div>
    <Footer />
  </>
);

export default Movies;
