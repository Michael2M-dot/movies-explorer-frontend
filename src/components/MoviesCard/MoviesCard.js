import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

const MoviesCard = ({
  movie,
  onMovieDelete,
  onMovieLike,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const isSavedMovie = useRouteMatch({ path: '/saved-movies', exact: true });
  const isMovies = useRouteMatch({ path: '/movies', exact: true });

  const movieLikeCheckboxStyle = `movie__checkbox movie__like-checkbox ${
    isLiked ? 'active' : ''
  }`;

  const handleMovieLike = () => {
    setIsLiked(!isLiked);
    onMovieLike(movie);
  };

  const handleDeleteMovie = () => {
    onMovieDelete(movie);
  };

  console.log(handleDeleteMovie);

  return (
    <li className='movie__item'>
      <img
        src={movie.image}
        alt={movie.description}
        className="movie__image"
        // onClick={handleClick}
      />
      <div className='movie__description'>
        <h3 className='movie__title'>{movie.description}</h3>
        <p className='movie__duration'>{movie.duration}</p>
      </div>
      {!isSavedMovie && (
      <button
        className={movieLikeCheckboxStyle}
        type='button'
        onClick={handleMovieLike}
      />
      )}
      {!isMovies && (
        <button
          className='movie__delete-button'
          type='button'
          onClick={handleDeleteMovie}
        />
      )}
    </li>
  );
};

export default MoviesCard;
