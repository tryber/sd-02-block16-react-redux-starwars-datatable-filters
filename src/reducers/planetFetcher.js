const INITIAL_STATE = {
  data: [],
};

const FETCH_PLANETS = 'FETCH_PLANETS';
const FILTER_BY_NAME = 'FILTER_BY_NAME';

export default function planetFetcher(state = INITIAL_STATE, {
  type, planets, planetsByName,
}) {
  switch (type) {
    case FETCH_PLANETS:
      return { ...state, data: [...planets] };
    case FILTER_BY_NAME:
      return { ...state, data: [...planetsByName[0].flat()] };
    default:
      return state;
  }
}
