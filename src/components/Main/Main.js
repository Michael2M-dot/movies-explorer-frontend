import React from 'react';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import Footer from '../Footer/Footer';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import NavTab from './NavTab/NavTab';
import Navigation from '../Navigation/Navigation';

const Main = ({ isLoggedIn }) => (
<>
  <Header>
    <Navigation
    isLoggedIn={isLoggedIn}
    />
  </Header>
  <main className='content'>
    <Promo />
    <AboutProject />
    <Techs />
    <AboutMe />
    <Portfolio>
      <NavTab />
    </Portfolio>
  </main>
  <Footer />
</>
);

export default Main;
