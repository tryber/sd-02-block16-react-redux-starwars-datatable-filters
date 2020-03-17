const INITIAL_STATE = {
  planets: [
    {
      name: 'fwf',
      rotation_period: 'fw',
      orbital_period: 'fwef',
      diameter: 'fwef',
      climate: 'fw',
      gravity: 'fwfw',
      terrain: 'fwe',
      surface_water: 'fw',
      populatio: 'fwfw',
      films: ['fwe', 'fw'],
      created: 'fw',
      edited: 'few',
      url: 'fwef',
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'test') return { planets: action.test };
  return state;
};
