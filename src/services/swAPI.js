const callFetchPlanets = () => (
  fetch('https://swapi.co/api/planets')
    .then((response) => (response.json()
      .then((json) => (response.ok
        ? Promise.resolve(json)
        : Promise.reject(json)))
    ))
);

export default callFetchPlanets;
