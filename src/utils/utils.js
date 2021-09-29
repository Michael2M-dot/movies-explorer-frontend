// проверяем статус пришедшего ответа
const checkResponse = (res) => {
  res.ok
    ? res.json()
    : Promise.reject(`${res.status} ${res.statusText}`);
};

export default checkResponse;
