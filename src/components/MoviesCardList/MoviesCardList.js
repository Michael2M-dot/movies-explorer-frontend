import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  movieCards=[],
  onMovieDelete,
  onMovieLike,
  showMoreMovie,
}) => {
  const isMovie = useRouteMatch({ path: '/movies', exact: true });
  const isShowMoreButtonVisible = (isMovie && movieCards.length !== 0) && (isMovie && movieCards.length < 3);

  return (
    <section className='movies-cards'>
      <ul className='movies-cards__list'>
        {movieCards.map((movie) => (
          <MoviesCard
            key={movie._id || movie.id}
            movie={movie}
            onMovieDelete={onMovieDelete}
            onMovieLike={onMovieLike}
          />
        ))}
      </ul>
      {isShowMoreButtonVisible && (
        <button
          type='button'
          className='movies-card__button '
          onClick={showMoreMovie}
        >
          Ещё
        </button>
      )}
    </section>
  );
};
export default MoviesCardList;
