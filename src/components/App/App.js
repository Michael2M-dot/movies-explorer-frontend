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
import ProtectedRoute from '../ProtectedRoute';
import * as movie from '../../utils/MovieApi';
import { getSearchedMovieList } from '../../utils/utils';

const App = () => {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  // работа с данными от стороннего API
  // управление карточками фильмов
  // загружаем карточки фильмов
  useEffect(() => {
    if (isLoggedIn) {
      // movie
      //   .movieApi()
      //   .then((movieCards) => {
      //     localStorage.setItem('movieCards', JSON.stringify(movieCards));
      //   })
      //   .catch((err) => {
      //     console.log(
      //       `Непредвиденная ошибка загрузки фильмов:
      //     ${err}`,
      //     );
      //   });
      api
        .getSavedMovie()
        .then((savedMovieData) => {
          setSavedMovies(savedMovieData);
        })
        .catch((err) => {
          console.log(
            `Непредвиденная ошибка загрузки фильмов:
          ${err}`,
          );
        });
      setMovies([]);
    }
  }, [isLoggedIn, history]);

  // ищем фильм по ключевому слову
  const handleGetMovie = (keyWord) => {
    setIsLoading(true);
    setMovies([]);
    movie
      .movieApi()
      .then((movieCards) => {
        localStorage.setItem('movieCards', JSON.stringify(movieCards));
      })
      .then(() => {
        const movieSearchedList = getSearchedMovieList(keyWord);
        if (movieSearchedList.length === 0) {
          setInfoMessage('Ничего не найдено');
        } else {
          setMovies(checkLiked(movieSearchedList));
          setInfoMessage('');
        }
      })
      .catch((err) => {
        console.log(
          `Непредвиденная ошибка загрузки фильмов:
          ${err}`,
          setInfoMessage(`Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.`),
        );
      })
      .finally(() => {
        setIsLoading(false);
        localStorage.removeItem('movieCards');
        setInfoMessage('');
      });
  };

  function checkLiked(moviesList) {
    savedMovies.forEach((item) => {
      moviesList.forEach((elm) => {
        if (item.movieId === elm.id) {
          // eslint-disable-next-line no-param-reassign
          elm.isLiked = true;
        }
      });
    });
    return moviesList;
  }

  // работа с данными от нашего API
  const [currentUser, setCurrentUser] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // регистрация, авторизация, выход из приложения
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
        setIsLoggedIn(true);
        history.push('/movies');
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

  useEffect(() => {
    api
      .checkToken()
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        history.push('/movies');
        setInfoMessage('');
      })
      .catch((err) => {
        const Error = err.toString();
        console.log(`Ошибка при проверке токена:${err}`);
        history.push('/signin');
        if (Error.includes('401')) {
          return setInfoMessage(`
        При авторизации произошла ошибка. Токен не передан или передан не в том формате.
        `);
        }
        if (Error.includes('500')) {
          return setInfoMessage(`
          На сервере произошла ошибка.
          `);
        }
        setInfoMessage(`
        При авторизации произошла ошибка. Переданный токен некорректен.
        `);
      });
  }, [history]);

  const onSignOut = () => {
    api
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        history.push('/signin');
        setCurrentUser({});
      })
      .catch((err) => {
        console.log(`
        Ошибка при закрытии сессии:${err}
        `);
      });
  };

  // добавляем фильм в медиатеку
  const handleAddMovie = (movieCard) => {
    const isAdded = savedMovies.some((item) => item.movieId === movieCard.id);

    if (!isAdded) {
      api
        .addNewMovie(movieCard)
        .then((newMovieCard) => {
          setSavedMovies((state) => [
            newMovieCard,
            ...state,
          ]);
          setMovies((state) => state.map((item) => {
            if (item.id === newMovieCard.movieId) {
              return {
                ...item,
                isLiked: true,
                _id: newMovieCard._id,
              };
            }
            return item;
          }));
        })
        .catch((err) => {
          console.log(`
        Ошибка при добавлении фильма в медиатеку:${err}
        `);
        });
    }
  };
  // удаляем фильм из медиатеки
  const handleDeleteMovie = (movieCard) => {
    console.log(movieCard.movieId);
    const isAdded = savedMovies.some((item) => item.movieId === movieCard.id || movieCard.movieId);
    console.log(isAdded);
    const targetMovie = savedMovies.find((item) => item.movieId === movieCard.id || movieCard.movieId);
    console.log(targetMovie);

    if (isAdded) {
      api
        .deleteMovie(targetMovie._id)
        .then(() => {
          setSavedMovies((state) => state.filter((item) => item._id !== targetMovie._id));
          setMovies((state) => state.map((item) => {
            if (item.movieId === targetMovie.id) {
              return {
                ...item,
                isLiked: false,
              };
            }
            return item;
          }));
        })
        .catch((err) => {
          console.log(`
        Ошибка при удалении фильма из медиатеки: ${err}
        `);
        });
    }
  };

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
            <ProtectedRoute
            component={Movies}
            path='/movies'
            movieCards={movies}
            onMovieLike={handleAddMovie}
            onMovieDelete={handleDeleteMovie}
            showMoreMovie={handleShowMoreMovie}
            handleGetMovie ={handleGetMovie}
            isLoading={isLoading}
            infoMessage={infoMessage}
            to='/signin'
            isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
            component={SavedMovies}
            path='/saved-movies'
            movieCards={savedMovies}
            onMovieDelete={handleDeleteMovie}
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            to='/signin'
            />
            <ProtectedRoute
            component={Profile}
            path='/profile'
            isLoggedIn={isLoggedIn}
            onSignOut={onSignOut}
            to='/signin'
            />
            <Route path="/main">
              <Main />
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
                <Redirect to="/movies" />
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
