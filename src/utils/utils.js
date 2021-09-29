// проверяем статус пришедшего ответа
const checkResponse = (res) => {
  res.ok
    ? res.json()
    // eslint-disable-next-line prefer-promise-reject-errors
    : Promise.reject(`${res.status} ${res.statusText}`);
};

export default checkResponse;
