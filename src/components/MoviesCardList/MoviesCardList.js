import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
// import movies from '../../utils/movies';

const MoviesCardList = ({
  movieCards,
  onMovieDelete,
  onMovieLike,
}) => (
  < section className='movies-cards'>
    <ul className='movies-cards__list'>
      {movieCards.map((movie) => (
        <MoviesCard
          key={movie.id}
          movieCard={movie}
          onMovieDelete={onMovieDelete}
          onMovieLike={onMovieLike}
        />
      ))}
    </ul>
  </section>
);

export default MoviesCardList;
