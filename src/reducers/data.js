const INITIAL_STATE = {
  planets: [
    {
      name: '',
      rotation_period: '',
      orbital_period: '',
      diameter: '',
      climate: '',
      gravity: '',
      terrain: '',
      surface_water: '',
      populatio: '',
      films: ['', ''],
      created: '',
      edited: '',
      url: '',
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'test') return { planets: action.test };
  return state;
};
