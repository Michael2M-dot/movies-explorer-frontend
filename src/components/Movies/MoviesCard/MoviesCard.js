import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

const MoviesCard = ({
  movieCard,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const movieCardStyle = { backgroundImage: `url(${movieCard.image})` };

  const isMyMovie = useRouteMatch({ path: '/saved-movies', exact: true });
  const isMovies = useRouteMatch({ path: '/movies', exact: true });

  const movieLikeCheckboxStyle = `movie__checkbox movie__like-checkbox ${
    isLiked ? 'active' : ''
  }`;

  const toggleLikeMovie = () => {
    setIsLiked(!isLiked);
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
      {!isMyMovie && (
      <button
        className={movieLikeCheckboxStyle}
        type='button'
        onClick={toggleLikeMovie}
      />
      )}
      {!isMovies && (
        <button
          className='movie__delete-button'
          type='button'
        />
      )}
    </li>
  );
};

export default MoviesCard;
