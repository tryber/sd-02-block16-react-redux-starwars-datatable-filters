import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const REQUEST_PLANETS = 'REQUEST_PLANETS';
export const RECEIVE_PLANETS = 'RECEIVE_PLANETS';

const initialState = {
  data: [
    {
      name: '',
    },
  ],
  filters: [
    {
      name: '',
    },
    {
      numericValues: {
        column: 'population',
        comparison: '>',
        value: '',
      },
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PLANETS:
      console.log(action);
      return state;
    case RECEIVE_PLANETS:
      console.log(action);
      return { ...state, data: action.planets };
    case 'CHANGE_FILTER_BY_NAME':
      return { ...state, filters: [{ name: action.value }, ...state.filters.slice(1)] };
    case 'CHANGE_FILTER_BY_NUMERIC_VALUES':
      return {
        ...state,
        filters: [
          state.filters[0],
          {
            numericValues: {
              ...state.filters[1].numericValues,
              [action.name]: action.value,
            },
          },
        ],
      };
    default: return state;
  }
};

export const store = createStore(reducer, applyMiddleware(thunk));
