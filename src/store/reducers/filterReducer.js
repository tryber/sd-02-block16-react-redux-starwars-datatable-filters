import {
  CREATE_FILTER_RESULTS,
  FILTER_RESULTS_BY_NAME,
  FILTER_RESULTS_BY_COLUMN,
} from '../actions/filterAction';

const INITIAL_STATE_FILTER_REDUCER = {
  filterResults: [],
  filters: [
    {
      name: '',
    },
    {
      numericValues: {
        column: '',
        comparison: '',
        value: 0,
      },
    },
  ],
};

const filterReducer = (state = INITIAL_STATE_FILTER_REDUCER, action) => {
  switch (action.type) {
    case CREATE_FILTER_RESULTS:
      return {
        ...state,
        filterResults: action.filterResults,
      };
    case FILTER_RESULTS_BY_NAME: {
      const [, ...rest] = action.filters;
      return {
        ...state,
        filterResults: action.filterResults,
        filters: [
          {
            name: action.name,
          },
          ...rest,
        ],
      };
    }
    case FILTER_RESULTS_BY_COLUMN: {
      return {
        ...state,
        filterResults: action.filterResults,
        filters: (state.filters[1].numericValues.column)
          ? [
            ...state.filters,
            {
              numericValues: action.numericValues,
            },
          ]
          : [
            state.filters[0],
            {
              numericValues: {
                ...state.filters[1].numericValues,
                ...action.numericValues,
              },
            },
          ],
      };
    }
    default:
      return state;
  }
};

export default filterReducer;
