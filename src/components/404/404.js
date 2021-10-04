import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Page404 = () => {
  const history = useHistory();

  return (
      <div className='page_page-404'>
        <section className='page-404'>
          <div className='page-404__wrapper'>
            <h1 className='page-404__title'>404</h1>
            <p className='page-404__text'>Страница не найдена</p>
          </div>
          <button className='page-404__link' onClick={() => history.goBack()}>Назад</button>
        </section>
      </div>
  );
};

export default Page404;
