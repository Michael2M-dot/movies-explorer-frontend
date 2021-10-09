// const searchedMovieList = 'movieSearchedCards';
// const searchKeyWord = 'movieSearchedKeyWord';

// достаем данные из локального хранилища
export const getDataFromStorage = (listName) => JSON.parse(localStorage.getItem(`${listName}`));
// export const getDataFromStorage = (listName) => localStorage.getItem(`${listName}`);

// записываем данные в локальное хранилище
export const setDataToStorage = (listName, data) => {
  // console.log('данные на входе', data);
  // localStorage.setItem(`${listName}`, data);
  localStorage.setItem(`${listName}`, JSON.stringify(data));
};

// удаление данных из локального хранилища
export const deleteDataFromStorage = (listName) => {
  localStorage.removeItem(`${listName}`);
}

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

// выполняем поиск в массиве объектов по ключевому слову
export const getSearchedMovieList = (keyWord, itemList) => (itemList.filter((item) => item.nameRU.toLowerCase()
  .includes(keyWord.toLowerCase())));

// проверяем добавлен ли фильм в базу, и добавляем ключ-значение.
export const checkMovieAdded = (movies, addedMovies) => {
  addedMovies.forEach((item) => {
    // movies.map((e) => e.isLiked = item.movieId === e.id);
    movies.map((e) => {
      if (e.id === item.movieId) {
        e.isLiked = true;
        console.log(e.id);
        console.log(item.movieId);
        console.log(e.isLiked);
        return e;
      } else {
        e.isLiked = false;
        console.log(e.id);
        console.log(item.movieId);
        console.log(e.isLiked);
        return e;
      }
    });
  });
  console.log(movies);
  return movies;
};

export default checkResponse;
