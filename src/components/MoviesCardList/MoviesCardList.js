import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  movieCards,
  onMovieDelete,
  onMovieLike,
  showMoreMovie,
}) => (
  < section className='movies-cards'>
    <ul className='movies-cards__list'>
      {movieCards.map((movie) => (
        <MoviesCard
          key={movie.id}
          movie={movie}
          onMovieDelete={onMovieDelete}
          onMovieLike={onMovieLike}
        />
      ))}
    </ul>
    <button
      type='button'
      className='movies-card__button '
      onClick={showMoreMovie}
    >
      Ещё
    </button>
  </section>
);

export default MoviesCardList;
