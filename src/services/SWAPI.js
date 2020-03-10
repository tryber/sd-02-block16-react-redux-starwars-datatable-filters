const SWAPI_BASE_API = 'https://swapi.co/api/planets';

export const fetchSWAPI = () => (
  fetch(SWAPI_BASE_API)
    .then((response) => (
      response.json()
        .then((data) => data)
    ))
);

export default fetchSWAPI;
