// проверяем статус пришедшего ответа
function checkResponse(res) {
  return res.ok
    ? res.json()
    // eslint-disable-next-line prefer-promise-reject-errors
    : Promise.reject(`${res.status}: ${res.statusText}`);
}

// переводим минуты в формат часы:минуты.
export const getHoursFromMinutes = (min) => {
  const hours = Math.trunc(min / 60);
  const minutes = min % 60;
  return `${hours}ч${minutes}м`;
};

export default checkResponse;

export const getSearchedMovieList = (keyWord) => {
  const movieCards = JSON.parse(localStorage.getItem('movieCards'));
  return movieCards.filter((item) => item.nameRU.toLowerCase()
    .includes(keyWord.toLowerCase()));
};
