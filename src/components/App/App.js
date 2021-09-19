import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
// import Main from '../Main/Main';
// import Movies from '../Movies/Movies';
// import SavedMovies from '../SavedMovies/SavedMovies';
// import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';

const App = () => {
  const [isLoggedIn] = useState('false');

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="page">
      <div className="page__container">
        <Switch>
          {/* <Route path="/"> */}
          {/*  <Main /> */}
          {/* </Route> */}
          {/* <Route path="/movies"> */}
          {/*  <Movies /> */}
          {/* </Route> */}
          {/* <Route path="/saved-movies"> */}
          {/*  <SavedMovies /> */}
          {/* </Route> */}
          {/* <Route path="/profile"> */}
          {/*  <Profile /> */}
          {/* </Route> */}
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
