import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../../utils/movies';

const MoviesCardList = ({ children }) => (
  < section className='movies-cards'>
    <ul className='movies-cards__list'>
      {movies.map((movie) => (
        <MoviesCard
          key={movie.id}
          movieCard={movie}
        />
      ))}
    </ul>
  </section>
);

export default MoviesCardList;
