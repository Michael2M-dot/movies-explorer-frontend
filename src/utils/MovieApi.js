import checkResponse from './utils';

export const movieApi = () => fetch('https://api.nomoreparties.co/beatfilm-movies', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then((res) => checkResponse(res))
  .then((res) => res);

export default movieApi;
