// проверяем статус пришедшего ответа
function checkResponse(res) {
  return res.ok
    ? res.json()
    // eslint-disable-next-line prefer-promise-reject-errors
    : Promise.reject(`${res.status} ${res.statusText}`);
}

export const getHoursFromMinutes = (min) => {
  const hours = Math.trunc(min / 60);
  const minutes = min % 60;
  return `${hours}ч${minutes}м`;
};

export default checkResponse;
