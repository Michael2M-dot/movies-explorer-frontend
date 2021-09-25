import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

const MoviesCard = ({
  movieCard,
  onMovieDelete,
  onMovieLike,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const movieCardStyle = { backgroundImage: `url(${movieCard.image})` };

  const isSavedMovie = useRouteMatch({ path: '/saved-movies', exact: true });
  const isMovies = useRouteMatch({ path: '/movies', exact: true });

  const movieLikeCheckboxStyle = `movie__checkbox movie__like-checkbox ${
    isLiked ? 'active' : ''
  }`;

  function handleMovieLike() {
    setIsLiked(!isLiked);
    // onMovieLike(movieCard);
  };

  function handleDeleteMovie() {
    onMovieDelete(movieCard);
  };

  return (
    <li className='movie__item'>
      <div
        className='movie__image'
        style={movieCardStyle}
      />
      <div className='movie__description'>
        <h3 className='movie__title'>{movieCard.description}</h3>
        <p className='movie__duration'>{movieCard.duration}</p>
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
