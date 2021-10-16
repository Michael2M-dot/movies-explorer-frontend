import React from 'react';

const FilterCheckbox = ({
  isShowShortMovie,
  onClick,
}) => (
    <div className='checkbox__wrapper'>
      <p className='checkbox__text'>Короткометражки</p>
      <div
        className={`checkbox__toggle
           ${isShowShortMovie ? 'active' : ''} `}
        onClick={onClick}
      />
    </div>
);

export default FilterCheckbox;
