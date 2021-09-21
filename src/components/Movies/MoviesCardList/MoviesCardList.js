import React from 'react';

const MoviesCardList = ({ children }) => (
  < section className='movies-cards'>
    <ul className='movies-cards__list'>
      {children}
    </ul>
  </section>
);

export default MoviesCardList;
