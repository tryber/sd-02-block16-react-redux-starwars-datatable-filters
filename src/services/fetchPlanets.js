const SWAPI = 'https://swapi.co/api/planets';

export const fetchPlanets = () => (
  fetch(SWAPI).then((response) => response.json().then((results) => results))
);

export default fetchPlanets;
