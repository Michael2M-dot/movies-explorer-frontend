import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
// eslint-disable-next-line import/named
import { getHoursFromMinutes } from '../../utils/utils';

const MoviesCard = ({
  movie,
  onMovieDelete,
  onMovieLike,
}) => {
  // отображение по маршрутам
  const isSavedMovie = useRouteMatch({ path: '/saved-movies', exact: true });
  const isMovies = useRouteMatch({ path: '/movies', exact: true });

  // стили и наполнение карточек
  // const [isLiked, setIsLiked] = useState(movie.isLiked);

  // // добавляем видимость для фильма, который уже есть в медиатеке
  // const isAdded = movie.owner.some((user) => user === currentUser._id);

  // const movieLikeCheckboxStyle = `movie__checkbox movie__like-checkbox ${
  //   isLiked ? 'active' : ''
  // }`;

  const movieLikeCheckboxStyle = `movie__checkbox movie__like-checkbox ${
    movie.isLiked ? 'active' : ''
  }`;

  const imageUrl = isMovies
    ? `https://api.nomoreparties.co${movie.image.url}`
    : movie.image;

  const duration = getHoursFromMinutes(movie.duration);

  // функциональность карточек (лайк и удаление)
  const handleMovieLike = () => {
    onMovieLike(movie);
    // if (!movie.isLiked) {
    //   onMovieLike(movie);
    // }
    // if (movie.isLiked) {
    //   onMovieDelete(movie);
    // }
  };

  const handleDeleteMovie = () => {
    console.log(movie);
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
          // onClick={handleClick}
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
