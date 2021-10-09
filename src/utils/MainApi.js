import checkResponse from './utils';

const BASE_URL = 'https://my-movie.nomoredomains.monster/api';
// const BASE_URL = 'https://localhost:3000';

// регистрация, авторизация, проверка токена и выход из приложения
export const register = (name, email, password) => fetch(`${BASE_URL}/signup`, {
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

export const login = (email, password) => fetch(`${BASE_URL}/signin`, {
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

export const checkToken = () => fetch(`${BASE_URL}/users/me`, {
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

export const signOut = () => fetch(`${BASE_URL}/signout`, {
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

export const getSavedMovie = () => fetch(`${BASE_URL}/movies`, {
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

export const addNewMovie = (data) => fetch(`${BASE_URL}/movies`, {
  method: 'POST',
  credentials: 'include',
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Control-Request-Headers': true,
  },
  body: JSON.stringify({
    nameRU: data.nameRU,
    duration: data.duration,
    image: `https://api.nomoreparties.co${data.image.url}`,
    trailer: data.trailerLink,
    movieId: data.id,
  }),
})
  .then((res) => checkResponse(res));

export const deleteMovie = (id) => fetch(`${BASE_URL}/movies/${id}`, {
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
