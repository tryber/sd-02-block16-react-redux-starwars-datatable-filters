const APIURL = 'https://swapi.co/api/planets/';
// inserir sw API

export const infoAPI = () => (
  fetch(APIURL)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
