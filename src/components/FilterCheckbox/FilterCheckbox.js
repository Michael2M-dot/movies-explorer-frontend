import React, { useState } from 'react';

const FilterCheckbox = () => {
  const [isShowShortMovie, setShowShortMovie] = useState(true);

  const toggleShowShortMovie = () => {
    setShowShortMovie(!isShowShortMovie);
  };

  return (
    <>
      <div className='checkbox__wrapper'>
        <p className='checkbox__text'>Короткометражки</p>
        <div
          className={`checkbox__toggle
           ${isShowShortMovie ? 'active' : ''} `}
          onClick={toggleShowShortMovie}
        />
      </div>
    </>
  );
};

export default FilterCheckbox;
