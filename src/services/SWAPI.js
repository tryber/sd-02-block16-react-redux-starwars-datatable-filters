const SWAPI = 'https://swapi.co/api/planets/';

const requestSWAPIdata = () => (
  fetch(SWAPI)
    .then((response) => response.json()
      .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data))))
);

export default requestSWAPIdata;
