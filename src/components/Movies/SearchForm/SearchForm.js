import React, { useState } from 'react';

const SearchForm = (
  onClick,
) => {
  const [isShowShortMovie, setShowShortMovie] = useState(true);

  const toggleShowShortMovie = () => {
    setShowShortMovie(!isShowShortMovie);
  };

  return (
     <section className='search-form'>
       <label className='search-form__input'>
         <input
           className='search-form__textfield'
           placeholder='Фильм'
         />
         <button
           className='search-form__button'
           onClick={onClick}
         >Найти</button>
       </label>
       <div className='search-form__wrapper'>
         <p className='search-form__text'>Короткометражки</p>
         <div
           className={`search-form__toggle
           ${isShowShortMovie ? 'active' : ''} `}
           onClick={toggleShowShortMovie}
         />
       </div>
     </section>
  )
};

export default SearchForm;
