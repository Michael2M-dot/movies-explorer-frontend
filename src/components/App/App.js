import React, { useEffect, useState } from 'react';
import {
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
  API_MOVIE_STORAGE,
  MOVIE_LIST_STORAGE,
  SAVED_MOVIE_STORAGE,
  SEARCH_KEYWORD_STORAGE,
  SHORT_MOVIE_SHOW,
  USER_STORAGE,
} from '../../utils/constants';
import {
  getDataFromStorage,
  getSearchedMovieList,
  getSearchedShortMovieList,
  setDataToStorage,
} from '../../utils/utils';

const App = () => {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(getDataFromStorage(USER_STORAGE) || {});
  const [movies, setMovies] = useState(getDataFromStorage(MOVIE_LIST_STORAGE) || [] );
  const [savedMovies, setSavedMovies] = useState(getDataFromStorage(SAVED_MOVIE_STORAGE) || []);
  const [searchInfoMessage, setSearchInfoMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAppLaunched, setIsAppLaunched] = useState(true);
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
  useEffect(() => {
    getMovieFromApi();
  }, []);

  useEffect(() => {
    setDataToStorage(USER_STORAGE, currentUser);
  }, [currentUser]);

  useEffect(() => {
    setDataToStorage(SAVED_MOVIE_STORAGE, savedMovies);
  }, [savedMovies]);

  const getMovieFromApi = () => {
    setIsLoading(true);
    setSearchInfoMessage('');

    movie
      .movieApi()
      .then((initialMovies) => {
        setDataToStorage(API_MOVIE_STORAGE, initialMovies);
      })
      .catch((err) => {
        console.log(
          `Непредвиденная ошибка загрузки фильмов:
          ${err}`,
        );
        setSearchInfoMessage(`Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.`);
      })
      .finally(() => setIsLoading(false));
  };

  const getAllMovies = (keyWord) => {
    const initialMovies = getDataFromStorage(API_MOVIE_STORAGE);
    setSearchInfoMessage('');

    if (initialMovies === null) {
      setIsLoading(true);
      setSearchInfoMessage('');

      movie
        .movieApi()
        .then((initialMoviesNew) => {
          const filteredMovie = getSearchedMovieList(keyWord, initialMoviesNew);
          setMovies(checkAddedMovie(filteredMovie, savedMovies));
          setDataToStorage(API_MOVIE_STORAGE, initialMovies);
          setDataToStorage(MOVIE_LIST_STORAGE, filteredMovie);
          setDataToStorage(SEARCH_KEYWORD_STORAGE, keyWord);
          setDataToStorage(SHORT_MOVIE_SHOW, false);
        })
        .catch((err) => {
          console.log(
            `Непредвиденная ошибка загрузки фильмов:
          ${err}`,
          );
          setSearchInfoMessage(`Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.`);
        })
        .finally(() => setIsLoading(false));
    } else {
      const filteredMovie = getSearchedMovieList(keyWord, initialMovies);
      if (filteredMovie.length === 0) {
        setSearchInfoMessage('Ничего не найдено!');
        setMovies([]);
        setDataToStorage(MOVIE_LIST_STORAGE, filteredMovie);
        setDataToStorage(SEARCH_KEYWORD_STORAGE, keyWord);
        setDataToStorage(SHORT_MOVIE_SHOW, false);
      } else {
        setMovies(checkAddedMovie(filteredMovie, savedMovies));
        setDataToStorage(MOVIE_LIST_STORAGE, filteredMovie);
        setDataToStorage(SEARCH_KEYWORD_STORAGE, keyWord);
        setDataToStorage(SHORT_MOVIE_SHOW, false);
      }
    }
  };

  const getShortMovies = (keyWord) => {
    const initialMovies = getDataFromStorage(API_MOVIE_STORAGE);
    if (initialMovies === null) {
      movie
        .movieApi()
        .then((initialMoviesNew) => {
          const filteredMovie = getSearchedShortMovieList(keyWord, initialMoviesNew);
          setMovies(checkAddedMovie(filteredMovie, savedMovies));
          setDataToStorage(API_MOVIE_STORAGE, initialMovies);
          setDataToStorage(MOVIE_LIST_STORAGE, filteredMovie);
          setDataToStorage(SEARCH_KEYWORD_STORAGE, keyWord);
          setDataToStorage(SHORT_MOVIE_SHOW, true);
        })
        .catch((err) => {
          console.log(
            `Непредвиденная ошибка загрузки фильмов:
          ${err}`,
          );
          setSearchInfoMessage(`Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.`);
        })
        .finally(() => setIsLoading(false));
    } else {
      const filteredMovie = getSearchedShortMovieList(keyWord, initialMovies);
      if (filteredMovie.length === 0) {
        setSearchInfoMessage('Ничего не найдено!');
        setMovies([]);
        setDataToStorage(MOVIE_LIST_STORAGE, filteredMovie);
        setDataToStorage(SEARCH_KEYWORD_STORAGE, keyWord);
        setDataToStorage(SHORT_MOVIE_SHOW, true);
      } else {
        setMovies(checkAddedMovie(filteredMovie, savedMovies));
        setDataToStorage(MOVIE_LIST_STORAGE, filteredMovie);
        setDataToStorage(SEARCH_KEYWORD_STORAGE, keyWord);
        setDataToStorage(SHORT_MOVIE_SHOW, true);
      }
    }
  };

  // ищем фильм по ключевому слову
  const handleGetMovie = (keyWord, isShowShortMovie) => {
    isShowShortMovie ? getShortMovies(keyWord) : getAllMovies(keyWord);
  };
  // const handleGetMovie = (keyWord, isShowShortMovie) => {
  //   setIsLoading(true);
  //   setSearchInfoMessage('');
  //   deleteDataFromStorage(searchKeyWord);
  //   deleteDataFromStorage(movieList);
  //   deleteDataFromStorage(showShortMovie);
  //
  //   movie
  //     .movieApi()
  //     .then((initialMovies) => {
  //       if (isShowShortMovie) {
  //         const filteredMovie = getSearchedShortMovieList(keyWord, initialMovies);
  //         setDataToStorage(movieList, filteredMovie);
  //         setDataToStorage(searchKeyWord, keyWord);
  //         setDataToStorage(showShortMovie, isShowShortMovie);
  //         return checkAddedMovie(filteredMovie, savedMovies);
  //       } else {
  //         const filteredMovie = getSearchedMovieList(keyWord, initialMovies);
  //         setDataToStorage(movieList, filteredMovie);
  //         setDataToStorage(searchKeyWord, keyWord);
  //         setDataToStorage(showShortMovie, isShowShortMovie);
  //         return checkAddedMovie(filteredMovie, savedMovies);
  //       }
  //     })
  //     .then((movieSearchedList) => {
  //       if (movieSearchedList.length === 0) {
  //         setSearchInfoMessage('Ничего не найдено');
  //         setMovies([]);
  //       } else {
  //         setMovies(movieSearchedList);
  //         setSearchInfoMessage('');
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(
  //         `Непредвиденная ошибка загрузки фильмов:
  //         ${err}`,
  //         setSearchInfoMessage(`Во время запроса произошла ошибка.
  //         Возможно, проблема с соединением или сервер недоступен.
  //         Подождите немного и попробуйте ещё раз.`),
  //       );
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  // работа с данными от нашего API
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inProcessing, setInProcessing] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const lastMovieList = getDataFromStorage(MOVIE_LIST_STORAGE) || [];

      api
        .getSavedMovie()
        .then((savedMovieData) => {
          setSavedMovies(savedMovieData);
          setDataToStorage(SAVED_MOVIE_STORAGE, savedMovieData);
          return savedMovieData;
        })
        .then((savedMoviesData) => {
          setMovies(checkAddedMovie(lastMovieList, savedMoviesData));
        })
        .catch((err) => console.log(`${err}: Непредвиденная ошибка загрузки фильмов!`));

      api.getUserData()
        .then((userData) => {
          setCurrentUser(userData);
          return userData;
        })
        .then((userData) => {
          setDataToStorage(USER_STORAGE, userData);
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
    setSearchInfoMessage('');
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
          setSearchInfoMessage('Ничего не найдено');
        } else {
          setSavedMovies(searchedMovieList);
          setSearchInfoMessage('');
        }
      })
      .catch((err) => {
        console.log(`${err}: Непредвиденная ошибка загрузки фильмов.`);
        setSearchInfoMessage(`Во время запроса произошла ошибка.
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
        setDataToStorage(USER_STORAGE, newUserData);
        setInfoMessage('Данные пользователя успешно обновлены!');
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
      .finally(() => {
        setIsSubmitted(false);
        setTimeout(() => setInfoMessage(''), 20000);
      });
  };

  // регистрация, авторизация, выход из приложения
  const onRegister = (values) => {
    const { name, email, password } = values;
    setIsSubmitted(true);

    api.register(name, email, password)
      .then((userData) => {
        setCurrentUser(userData);
        history.push('/movies');
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
        setDataToStorage(USER_STORAGE, userData);
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
    setInfoMessage('');

    api
      .checkToken()
      .then(() => {
        setIsLoggedIn(true);
        setInfoMessage('');
      })
      .catch((err) => {
        console.log(`${err}: Ошибка при проверке токена.`);
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
        history.push('/');
        setCurrentUser({});
        localStorage.clear();
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
            searchInfoMessage={searchInfoMessage}
            to='/'
            isLoggedIn={isLoggedIn}
            inProcessing={inProcessing}
            />
            <ProtectedRoute
            component={SavedMovies}
            path='/saved-movies'
            movieCards={savedMovies}
            onMovieDelete={handleDeleteMovie}
            onSearchMovie={handleGetSavedMovie}
            searchInfoMessage={searchInfoMessage}
            isAppLaunched={isAppLaunched}
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            inProcessing={inProcessing}
            to='/'
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
            to='/'
            />
            <Route exact path="/">
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
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
