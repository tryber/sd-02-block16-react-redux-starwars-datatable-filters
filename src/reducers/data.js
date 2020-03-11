const INITIAL_STATE = {
  planets: [
    {
      name: 'name',
      rotation_period: '2',
      orbital_period: '3',
      diameter: '2',
      climate: 'temperate',
      gravity: '1 standard',
      terrain: 'grasslands, mountains',
      surface_water: '3',
      populatio: '2000000000',
      films: ['coisa', 'coisa2'],
      created: '2014-12-10T11:35:48.479000Z',
      edited: '2014-12-20T20:58:18.420000Z',
      url: 'https://swapi.co/api/planets/2/',
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'test') return { planets: action.test };
  return state;
};
