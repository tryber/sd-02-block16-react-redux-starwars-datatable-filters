const API = 'https://swapi.co/api/planets/';

const fetchApi = () => (
  fetch(API)
    .then((response) => (
      response
        .json()
        .then((json) => ((response.ok)
          ? Promise.resolve(json.results)
          : Promise.reject(json)))
    ))
);

export default fetchApi;
