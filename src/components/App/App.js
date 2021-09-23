import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Page404 from '../404/404';

const App = () => {
  const [isLoggedIn] = useState(true);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="page">
      <div className="page__container">
        <Switch>
           <Route path="/main">
             <Main />
           </Route>
           <Route path="/movies">
            <Movies />
           </Route>
           <Route path="/saved-movies">
            <SavedMovies />
           </Route>
           <Route path="/profile">
            <Profile />
           </Route>
          <Route path='/404'>
            <Page404 />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/">
            {isLoggedIn ? (
              <Redirect to="/main" />
            ) : (
              <Redirect to="/signin" />
            )}
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
