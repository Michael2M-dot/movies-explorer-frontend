import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import './App.css';
import CurrentUserContext from '../../context/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Page404 from '../404/404';
import * as api from '../../utils/MainApi';
// import {
//   register,
//   login,
//   checkToken,
//   logout,
//   getUserData,
//   getSavedMovieData,
//   updateUserData,
//   addNewMovie,
//   deleteMovie,
// } from '../../utils/MainApi';
import * as movie from '../../utils/MovieApi';

const App = () => {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  // работа с данными от стороннего API
  // управление карточками фильмов
  // загружаем карточки фильмов
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

  // ищем фильм по ключевому слову
  const handleGetMovie = (keyWord) => {
    const movieCards = JSON.parse(localStorage.getItem('movieCards'));
    const movieSearchResult = movieCards.filter((item) => item.nameRU.toLowerCase().includes(keyWord.toLowerCase()));
    setMovies(movieSearchResult);
  };

  // работа с данными от нашего API
  const [currentUser, setCurrentUser] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // регистрация, авторизация, выход из приложения

  // useEffect(() => {
  //   setInfoMessage();
  // },[infoMessage]);

  const onRegister = (values) => {
    const { name, email, password } = values;
    api
      .register(name, email, password)
      .then((userData) => {
        setCurrentUser(userData);
        history.push('/signin');
      })
      .catch((err) => {
        const Error = err.toString();
        console.log(`
        Ошибка: ${Error}
        `);
        if (Error.includes('409')) {
          return setInfoMessage(`
          Пользователь с таким email уже существует.
          `);
        }
        if (Error.includes('500')) {
          return setInfoMessage(`
          На сервере произошла ошибка.
          `);
        }
        setInfoMessage(`
        При регистрации пользователя произошла ошибка.
        `);
      });
  };

  const onLogin = (values) => {
    setIsSubmitted(true);
    const { email, password } = values;
    api
      .login(email, password)
      .then((userData) => {
        setCurrentUser(userData);
        history.push('/movies');
        setIsLoggedIn(true);
      })
      .catch((err) => {
        const Error = err.toString();
        console.log(`
        Ошибка: ${Error}
        `);
        if (Error.includes('401')) {
          return setInfoMessage(`
          Вы ввели неправильный логин или пароль.
          `);
        }
        setInfoMessage(`
          На сервере произошла ошибка.
        `);
      })
      .finally(() => {
        setIsSubmitted(false);
      });
  };

  // удаляем фильм из медиатеки
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
    <CurrentUserContext.Provider
    value={{
      currentUser,
      infoMessage,
    }}
    >
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
            <Route path="/signin">
              <Login
              onLogin={onLogin}
              infoMessage={infoMessage}
              isSubmitted={isSubmitted}
              />
            </Route>
            <Route path="/signup">
              <Register
              onRegister={onRegister}
              infoMessage={infoMessage}
              isSubmitted={isSubmitted}
              />
            </Route>
            <Route path='*'>
              <Page404 />
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
    </CurrentUserContext.Provider>
  );
};

export default App;
