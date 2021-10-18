import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import useRenderAboutWindowSize from '../../hooks/useRenderAboutWindowSize';

const MoviesCardList = ({
  movieCards,
  onMovieDelete,
  onMovieAdd,
  inProcessing,
}) => {
  const history = useHistory();

  const {
    getRenderList,
    addRenderList = false,
    getCountAndStepAboutWindow,
    baseCount,
    step,
  } = useRenderAboutWindowSize();
  const [renderMovies, setRenderMovies] = useState(movieCards);
  const [count, setCount] = useState(baseCount);
  const isMovie = useRouteMatch({ path: '/movies', exact: true });
  const movieForRender = isMovie ? renderMovies : movieCards;

  useEffect(() => {
    getCountAndStepAboutWindow();
    setCount(baseCount);
    const renderList = getRenderList(movieCards, step, count);
    setRenderMovies(renderList);
  }, [movieCards, window, baseCount, history]);

  const showMoreMovie = () => {
    setCount(count + step);
    setRenderMovies(getRenderList(movieCards, step, count + step));
  };

  return (
    <section className='movies-cards'>
      <ul className='movies-cards__list'>
        {movieForRender.map((movie) => (
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
          hidden={!addRenderList || false}
        >
          Ещё
        </button>
      )}
    </section>
  );
};
export default MoviesCardList;
