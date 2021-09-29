import checkResponse from './utils';

const BASE_URL = 'https://my-movie.nomoredomains.monster/api/';

// регистрация, авторизация, проверка токена и выход из приложения
export const register = (name, email, password) => {
  fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': true,
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
    .then((res) => checkResponse(res));
};

export const login = (email, password) => {
  fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Control-Request-Headers': true,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => checkResponse(res));
};

export const checkToken = () => {
  fetch(`${BASE_URL}/users/me`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Control-Request-Headers': true,
    },
  })
    .then((res) => checkResponse(res));
};

export const logout = () => {
  fetch(`${BASE_URL}/logout`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Control-Request-Headers': true,
    },
  })
    .then((res) => checkResponse(res));
};

// получение данных из БД (о пользователе и сохраненных фильмах)
export const getUserData = () => {
  fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Control-Request-Headers': true,
    },
  })
    .then((res) => checkResponse(res));
};

export const getSavedMovieData = () => {
  fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Control-Request-Headers': true,
    },
  })
    .then((res) => checkResponse(res));
};

// редактирование данных в БД (данные пользователя, добавление и удаление фильмов)
export const updateUserData = (name, email) => {
  fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Control-Request-Headers': true,
    },
    body: JSON.stringify({
      name,
      email,
    }),
  })
    .then((res) => checkResponse(res));
};

export const addNewMovie = (data) => {
  fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Control-Request-Headers': true,
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: data.image.url,
      trailerLink: data.trailerLink,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      // thumbnail: data.thumbnail,
      movieId: data.movieId,
    }),
  })
    .then((res) => checkResponse(res));
};

export const deleteMovie = (_id) => {
  fetch(`${BASE_URL}/movies/${_id}`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Control-Request-Headers': true,
    },
  })
    .then((res) => checkResponse(res));
};
