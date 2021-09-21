import React from 'react';

const Portfolio = ({ children }) => (
  <section className='portfolio'>
    <h2 className='portfolio__title'>Портфолио</h2>
    {children}
  </section>
);

export default Portfolio;
