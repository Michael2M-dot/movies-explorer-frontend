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
import {
  getSearchedMovieList,
  checkMovieAdded,
  getDataFromStorage,
  setDataToStorage,
  deleteDataFromStorage,
} from '../../utils/utils';

const App = () => {
  const history = useHistory();
  const movieList = 'movieSearchedCards';
  const searchKeyWord = 'movieSearchedKeyWord';

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([] );
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    // localStorage.removeItem('movieSearchedCards');
    if (isLoggedIn) {
      getLastSearchResult();
      getSavedMovies();
    }
  }, [history, isLoggedIn]);

  // результат последнего поиска из localStorage
  const getLastSearchResult = () => {
    const initialMovies = getDataFromStorage(movieList);
    const searchedMovie = checkMovieAdded(initialMovies, savedMovies);
    console.log(searchedMovie);
    if (searchedMovie !== null) {
      setMovies(searchedMovie);
    } else {
      setMovies([]);
    }
  };

  // работа с данными от стороннего API
  // ищем фильм по ключевому слову
  const handleGetMovie = (keyWord) => {
    setIsLoading(true);
    setInfoMessage('');
    deleteDataFromStorage(searchKeyWord);
    deleteDataFromStorage(movieList);

    movie
      .movieApi()
      .then((movieInitialCards) => {
        setMovies([]);
        const searchingMovies = getSearchedMovieList(keyWord, movieInitialCards);
        const filteredMovies = checkMovieAdded(searchingMovies, savedMovies);
        console.log(savedMovies);
        console.log(filteredMovies);

        if (filteredMovies.length === 0) {
          setInfoMessage('Ничего не найдено');
        } else {
          setInfoMessage('');
          setMovies(filteredMovies);
          setDataToStorage(movieList, filteredMovies);
          setDataToStorage(searchKeyWord, keyWord);
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
      });
  };

  // работа с данными от нашего API
  const [currentUser, setCurrentUser] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // получаем фильмы из медиатеки
  const getSavedMovies = () => {
    if (isLoggedIn) {
      api
        .getSavedMovie()
        .then((savedMovieData) => {
          setSavedMovies(savedMovieData);
        })
        .catch((err) => {
          console.log(
            `Непредвиденная ошибка загрузки фильмов:
          ${err}`,
            setInfoMessage(`Во время запроса произошла ошибка.
            Возможно, проблема с соединением или сервер недоступен.
            Подождите немного и попробуйте ещё раз.`),
          );
        });
    }
  };

  // добавляем фильм в медиатеку
  const handleAddMovie = (movieCard) => {
    console.log(movieCard);
    const isAdded = savedMovies.some((item) => item.movieId === movieCard.id);
    console.log('добавлен', isAdded);

    if (!isAdded) {
      api
        .addNewMovie(movieCard)
        .then((newMovieCard) => {
          setSavedMovies((state) => [
            ...state,
            newMovieCard,
          ]);
          setMovies((state) => state.map((e) => (e.id === newMovieCard.movieId
            ? { ...e, isLiked: true }
            : e
          )));
          deleteDataFromStorage(movieList);
        })
        .then(() => {
          setDataToStorage(movieList, movies);
        })
        .catch((err) => {
          console.log(`
        Ошибка при добавлении фильма в медиатеку:${err}
        `);
        });
    }
    handleDeleteMovie(movieCard);
  };

  // удаляем фильм из медиатеки
  const handleDeleteMovie = (movieCard) => {
    const isAdded = savedMovies.some((item) => item.movieId === (movieCard.id || movieCard.movieId));
    const targetMovie = savedMovies.find((item) => item.movieId === (movieCard.id || movieCard.movieId));

    console.log('вход на удаление', targetMovie);
    if (isAdded) {
      api
        .deleteMovie(targetMovie._id)
        .then(() => getSavedMovies())
        .then(() => {
          setMovies((state) => state.map((e) => (e.id === targetMovie.movieId
            ? { ...e, isLiked: false }
            : e
          )));
        })
        .then(() => {
        })
        .catch((err) => {
          console.log(`
        Ошибка при удалении фильма из медиатеки: ${err}
        `);
        });
    }
  };

  const handleGetSavedMovie = (keyWord) => {
    setIsLoading(true);
    setInfoMessage('');
    setSavedMovies([]);

    api
      .getSavedMovie()
      .then((savedMovieList) => {
        const movieSearchedList = getSearchedMovieList(keyWord, savedMovieList);
        if (movieSearchedList.length === 0) {
          setInfoMessage('Ничего не найдено');
        } else {
          setSavedMovies(movieSearchedList);
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
      });
  };

  // отображение большего списка фильмов
  function handleShowMoreMovie() {
    console.log(movies);
  }

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
            to='/main'
            isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
            component={SavedMovies}
            path='/saved-movies'
            movieCards={savedMovies}
            onMovieDelete={handleDeleteMovie}
            onSearchMovie={handleGetSavedMovie}
            infoMessage={infoMessage}
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            to='/main'
            />
            <ProtectedRoute
            component={Profile}
            path='/profile'
            isLoggedIn={isLoggedIn}
            onSignOut={onSignOut}
            to='/main'
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
