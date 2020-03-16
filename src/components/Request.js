const swAPI = 'https://swapi.co/api/planets';

const getPlanets = () => {
  fetch(`${swAPI}/planets`)
    .then((response) => {
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)));
    });
};

export default getPlanets;
