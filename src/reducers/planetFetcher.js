const INITIAL_STATE = {
  data: [],
};

const FETCH_PLANETS = 'FETCH_PLANETS';

export default function planetFetcher(state = INITIAL_STATE, {
  type, planets,
}) {
  switch (type) {
    case FETCH_PLANETS:
      return { ...state, data: [...planets] };
    default:
      return state;
  }
}
