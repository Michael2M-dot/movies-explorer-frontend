import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Page404 from '../404/404';
import {
  register,
  login,
  checkToken,
  logout,
  getUserData,
  getSavedMovieData,
  updateUserData,
  addNewMovie,
  deleteMovie,
} from '../../utils/MainApi';
import * as movie from '../../utils/MovieApi';
// import movieApi from '../../utils/MovieApi';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // управление карточками фильмов
  useEffect(() => {
    if (isLoggedIn) {
      movie
        .movieApi(movie)
        .then((movieCards) => {
          localStorage.setItem('movieCards', JSON.stringify(movieCards));
        })
        .catch((err) => {
          console.log(
            `Непредвиденная ошибка загрузки фильмов:
          ${err.status} ${err.messages}`,
          );
        });
    }
  }, [isLoggedIn]);

  const handleGetMovie = (keyWord) => {
    console.log(keyWord);
    const movieCards = JSON.parse(localStorage.getItem('movieCards'));
    const movieSearchResult = movieCards.filter((item) => item.nameRU.toLowerCase().includes(keyWord));
    setMovies(movieSearchResult);
  };

  function handleMovieDelete(e) {
    e.preventDefault();
  }

  function handleMovieLike(e) {
    e.preventDefault();
  }

  // отображение большего списка фильмов
  function handleShowMoreMovie() {
    console.log(movies);
  }

  return (
    <div className="page">
      <div className="page__container">
        <Switch>
           <Route path="/main">
             <Main />
           </Route>
           <Route path="/movies">
            <Movies
              movieCards={movies}
              onMovieLike={handleMovieLike}
              showMoreMovie={handleShowMoreMovie}
              handleGetMovie ={handleGetMovie}
              isLoading={isLoading}
            />
           </Route>
           <Route path="/saved-movies">
            <SavedMovies
              movieCards={movies}
              onMovieDelete={handleMovieDelete}
              showMoreMovie={handleShowMoreMovie}
              isLoading={isLoading}
            />
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
