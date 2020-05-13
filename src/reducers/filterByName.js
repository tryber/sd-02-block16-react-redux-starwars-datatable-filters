const INITIAL_STATE = {
  tags: [
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ],
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'filterByName') {
    return {
      tags: action.tags,
    };
  }
  return state;
};
