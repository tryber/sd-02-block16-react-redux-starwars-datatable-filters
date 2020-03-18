const getarrayPlanets = () => (
  fetch('https://swapi.co/api/planets')
    .then((response) => response
      .json()
      .then((results) => (response.ok ? Promise.resolve(results)
        : Promise.reject(results))))
);

export default getarrayPlanets;
