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
  deleteDataFromStorage,
  getDataFromStorage,
  getSearchedMovieList,
  getSearchedShortMovieList,
  setDataToStorage,
} from '../../utils/utils';

const App = () => {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAppLaunched, setIsAppLaunched] = useState(true);
  const [movies, setMovies] = useState([] );
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  // проверяем если фильм уже добавлен
  const checkAddedMovie = (moviesList, savedMovieList) => {
    savedMovieList.forEach((item) => {
      moviesList.map((e) => {
        if (e.id === item.movieId) {
          e.isAdded = true;
          e._id = item._id;
          return e;
        }
        return e;
      });
    });
    return moviesList;
  };

  // работа с данными от стороннего API
  // ищем фильм по ключевому слову
  const handleGetMovie = (keyWord, isShowShortMovie) => {
    setIsLoading(true);
    setInfoMessage('');
    deleteDataFromStorage(searchKeyWord);
    deleteDataFromStorage(movieList);
    deleteDataFromStorage(showShortMovie);

    movie
      .movieApi()
      .then((initialMovies) => {
        if (isShowShortMovie) {
          const filteredMovie = getSearchedShortMovieList(keyWord, initialMovies);
          setDataToStorage(movieList, filteredMovie);
          setDataToStorage(searchKeyWord, keyWord);
          setDataToStorage(showShortMovie, isShowShortMovie);
          return checkAddedMovie(filteredMovie, savedMovies);
        } else {
          const filteredMovie = getSearchedMovieList(keyWord, initialMovies);
          setDataToStorage(movieList, filteredMovie);
          setDataToStorage(searchKeyWord, keyWord);
          setDataToStorage(showShortMovie, isShowShortMovie);
          return checkAddedMovie(filteredMovie, savedMovies);
        }
      })
      .then((movieSearchedList) => {
        if (movieSearchedList.length === 0) {
          setInfoMessage('Ничего не найдено');
          setMovies([]);
        } else {
          setMovies(movieSearchedList);
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

  // работа с данными от нашего API
  const [currentUser, setCurrentUser] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inProcessing, setInProcessing] = useState(false);

  const movieList = `movieSearchedCards-${currentUser.email}`;
  const searchKeyWord = `movieSearchedKeyWord-${currentUser.email}`;
  const showShortMovie = 'showShortMovieBoolean';

  useEffect(() => {
    if (isLoggedIn) {
      const lastMovieList = getDataFromStorage(movieList) || [];
      const lastSearchedKeyword = getDataFromStorage(searchKeyWord) || '';
      const showShortMovieBoolean = getDataFromStorage(showShortMovie) || false;

      api
        .getSavedMovie()
        .then((savedMovieData) => {
          setSavedMovies(savedMovieData);
          return savedMovieData;
        })
        .then((savedMoviesData) => {
          setMovies(checkAddedMovie(lastMovieList, savedMoviesData));
        })
        .catch((err) => console.log(`${err}: Непредвиденная ошибка загрузки фильмов!`));

      api.getUserData()
        .then((userData) => {
          setCurrentUser({
            ...userData,
            keyword: lastSearchedKeyword,
            shortMovieBoolean: showShortMovieBoolean,
          });
        })
        .catch((err) => console.log(`${err}: Непредвиденная ошибка загрузки данных пользователя!`));
    }
  }, [isLoggedIn]);

  // добавляем новый фильм в медиатеку
  const handleAddNewMovie = (newMovieData) => {
    setInProcessing(true);

    if (!newMovieData.isAdded) {
      api.addNewMovie(newMovieData)
        .then((newMovieDataFull) => {
          setSavedMovies((state) => [
            {
              ...newMovieDataFull,
              isAdded: true,
            },
            ...state,
          ]);
          setMovies((state) => state.map((e) => (e.id === newMovieData.id
            ? {
              ...e,
              isAdded: true,
              _id: newMovieDataFull._id,
            }
            : e
          )));
        })
        .catch((err) => console.log(`${err}: Ошибка добавления фильма в медиатеку!`))
        .finally(() => setInProcessing(false));
    }
  };

  // удаляем фильм из медиатеки
  const handleDeleteMovie = (movieForDelete) => {
    setInProcessing(true);

    api.deleteMovie(movieForDelete._id)
      .then(() => {
        setMovies((state) => state.map((e) => (e._id === movieForDelete._id
          ? {
            ...e,
            isAdded: false,
            _id: undefined,
          }
          : e
        )));
        setSavedMovies((state) => state.filter((e) => e._id !== movieForDelete._id));
      })
      .catch((err) => console.log(`${err}: Ошибка удаления фильма из медиатеки!`))
      .finally(() => setInProcessing(false));
  };

  // поиск среди сохраненных фильмов
  const handleGetSavedMovie = (keyWord, isShowShortMovie) => {
    setIsLoading(true);
    setInfoMessage('');
    setSavedMovies([]);

    api
      .getSavedMovie()
      .then((savedMovieList) => {
        if (isShowShortMovie) {
          return getSearchedShortMovieList(keyWord, savedMovieList);
        } else {
          return getSearchedMovieList(keyWord, savedMovieList);
        }
      })
      .then((searchedMovieList) => {
        if (searchedMovieList.length === 0) {
          setInfoMessage('Ничего не найдено');
        } else {
          setSavedMovies(searchedMovieList);
          setInfoMessage('');
        }
      })
      .catch((err) => {
        console.log(`${err}: Непредвиденная ошибка загрузки фильмов.`);
        setInfoMessage(`Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.`);
      })
      .finally(() => setIsLoading(false));
  };

  // обновление данных пользователя
  const handleUpdateUser = (userUpdateData) => {
    const { name, email } = userUpdateData;
    setIsSubmitted(true);
    setInfoMessage('');

    api
      .updateUserData(name, email)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        // setInfoMessage('Данные пользователя успешно обновлены!');
      })
      .catch((err) => {
        const Error = err.toString();
        console.log(`${err}: При обновлении информации о пользователе.`);
        if (Error.includes('409')) {
          return setInfoMessage('Пользователь с таким email уже существует.');
        }
        if (Error.includes('500')) {
          return setInfoMessage('На сервере произошла ошибка.');
        }
        setInfoMessage('При обновлении данных пользователя произошла ошибка.');
      })
      .finally(() => setIsSubmitted(false));
  };

  // регистрация, авторизация, выход из приложения
  const onRegister = (values) => {
    const { name, email, password } = values;
    setIsSubmitted(true);

    api.register(name, email, password)
      .then((userData) => {
        setCurrentUser(userData);
        history.push('/signin');
        setInfoMessage('');
      })
      .catch((err) => {
        const Error = err.toString();
        console.log(`Ошибка: ${Error}`);

        if (Error.includes('409')) {
          return setInfoMessage('Пользователь с таким email уже существует.');
        }
        if (Error.includes('500')) {
          return setInfoMessage('На сервере произошла ошибка.');
        }
        setInfoMessage('При регистрации пользователя произошла ошибка.');
      })
      .finally(() => setIsSubmitted(false));
  };

  const onLogin = (values) => {
    setIsSubmitted(true);
    const { email, password } = values;

    api.login(email, password)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        history.push('/movies');
        setInfoMessage('');
      })
      .catch((err) => {
        const Error = err.toString();
        console.log(`Ошибка: ${Error}`);
        if (Error.includes('401')) {
          return setInfoMessage('Вы ввели неправильный логин или пароль.');
        }
        setInfoMessage('На сервере произошла ошибка.');
      })
      .finally(() => setIsSubmitted(false));
  };

  useEffect(() => {
    setIsAppLaunched(true);

    api
      .checkToken()
      .then(() => {
        setIsLoggedIn(true);
        history.push('/movies');
        setInfoMessage('');
      })
      .catch((err) => {
        console.log(`${err}: Ошибка при проверке токена.`);
        history.push('/signin');
      })
      .finally(() => {
        setIsAppLaunched(false);
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
      .catch((err) => console.log(`${err}: Ошибка при закрытии сессии.`));
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
            onMovieAdd={handleAddNewMovie}
            onMovieDelete={handleDeleteMovie}
            handleGetMovie ={handleGetMovie}
            isLoading={isLoading}
            isAppLaunched={isAppLaunched}
            infoMessage={infoMessage}
            to='/main'
            isLoggedIn={isLoggedIn}
            inProcessing={inProcessing}
            />
            <ProtectedRoute
            component={SavedMovies}
            path='/saved-movies'
            movieCards={savedMovies}
            onMovieDelete={handleDeleteMovie}
            onSearchMovie={handleGetSavedMovie}
            infoMessage={infoMessage}
            isAppLaunched={isAppLaunched}
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            inProcessing={inProcessing}
            to='/main'
            />
            <ProtectedRoute
            component={Profile}
            path='/profile'
            isSubmitted={isSubmitted}
            isAppLaunched={isAppLaunched}
            isLoggedIn={isLoggedIn}
            inProcessing={inProcessing}
            onSignOut={onSignOut}
            onUpdateUser={handleUpdateUser}
            to='/main'
            />
            <Route path="/main">
              <Main
              isLoggedIn={isLoggedIn}
              />
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
