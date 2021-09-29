import checkResponse from './utils';

const BASE_URL = 'https://my-movie.nomoredomains.monster/api/';

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

const signOut = () => {
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

export default {
  register,
  login,
  checkToken,
  signOut,
};
