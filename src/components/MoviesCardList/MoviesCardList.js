import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import useRenderAboutWindowSize from '../../hooks/useRenderAboutWindowSize';

const MoviesCardList = ({
  movieCards,
  onMovieDelete,
  onMovieAdd,
  inProcessing,
}) => {
  const {
    getRenderList,
    addRenderList,
    getCountAndStepAboutWindow,
    baseCount,
    step,
  } = useRenderAboutWindowSize();
  const [renderMovies, setRenderMovies] = useState([]);
  const [count, setCount] = useState(baseCount);
  const isMovie = useRouteMatch({ path: '/movies', exact: true });
  const movieForRender = isMovie ? renderMovies : movieCards;
  // console.log('в стейте на начало', count);
  // console.log('enter', movieCards);

  useEffect(() => {
    getCountAndStepAboutWindow();
    setCount(baseCount);
    const renderList = getRenderList(movieCards, step, count);
    setRenderMovies(renderList);
  }, [movieCards, window, baseCount]);

  const showMoreMovie = () => {
    setCount(count + step);
    // console.log('счетчик на вход', count);
    setRenderMovies(getRenderList(movieCards, step, count + step));
  };

  // console.log('render', renderMovies);

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
        {/* {movieCards.map((movie) => ( */}
        {/*  <MoviesCard */}
        {/*    key={isMovie ? movie.id : movie._id} */}
        {/*    movie={movie} */}
        {/*    onMovieDelete={onMovieDelete} */}
        {/*    onMovieAdd={onMovieAdd} */}
        {/*    inProcessing={inProcessing} */}
        {/*  /> */}
        {/* ))} */}
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
