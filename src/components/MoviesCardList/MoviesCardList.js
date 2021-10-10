import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  movieCards,
  onMovieDelete,
  onMovieAdd,
  showMoreMovie,
  inProcessing,
}) => {
  const isMovie = useRouteMatch({ path: '/movies', exact: true });

  return (
    <section className='movies-cards'>
      <ul className='movies-cards__list'>
        {movieCards.map((movie) => (
          <MoviesCard
            key={isMovie ? movie.id : movie._id}
            movie={movie}
            onMovieDelete={onMovieDelete}
            onMovieAdd={onMovieAdd}
            inProcessing={inProcessing}
          />
        ))}
      </ul>
      {isMovie && (
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
