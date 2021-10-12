import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getHoursFromMinutes } from '../../utils/utils';

const MoviesCard = ({
  movie,
  onMovieDelete,
  onMovieAdd,
  inProcessing = false,
}) => {
  // отображение по маршрутам
  const isSavedMovie = useRouteMatch({ path: '/saved-movies', exact: true });
  const isMovies = useRouteMatch({ path: '/movies', exact: true });

  const movieLikeCheckboxStyle = `movie__checkbox movie__like-checkbox ${
    movie.isAdded ? 'active' : ''
  }`;

  const imageUrl = isMovies
    ? `https://api.nomoreparties.co${movie.image.url}`
    : movie.image;

  const duration = getHoursFromMinutes(movie.duration);

  const handleToggleMovie = () => {
    if (!movie.isAdded) {
      onMovieAdd(movie);
    } else {
      onMovieDelete(movie);
    }
  };

  const handleDeleteMovie = () => {
    onMovieDelete(movie);
  };

  return (
    <li className='movie__item'>
      <a
      className='movie__link'
      href={movie.trailerLink}
      target='_blank'
      rel='noopener noreferrer'
      >
        <img
          src={imageUrl}
          alt={movie.nameRU}
          className="movie__image"
        />
      </a>
      <div className='movie__description'>
        <h3 className='movie__title'>{movie.nameRU}</h3>
        <p className='movie__duration'>{duration}</p>
      </div>
      {!isSavedMovie && (
      <button
        className={movieLikeCheckboxStyle}
        type='button'
        onClick={handleToggleMovie}
        disabled={inProcessing}
      />
      )}
      {!isMovies && (
        <button
          className='movie__delete-button'
          type='button'
          onClick={handleDeleteMovie}
          disabled={inProcessing}
        />
      )}
    </li>
  );
};

export default MoviesCard;
