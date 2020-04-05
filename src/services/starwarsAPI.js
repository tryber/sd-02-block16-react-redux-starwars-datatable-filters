const SW_BASE_API = 'https://swapi.co/api/planets';

const getPlanets = async () => {
  const response = await fetch(SW_BASE_API);
  const json = await response.json();
  return (response.ok ? Promise.resolve(json) : Promise.reject(json));
};

export default getPlanets;
