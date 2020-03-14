//import { initialState } from './index';

export const CHANGE_FILTER_BY_NAME = 'CHANGE_FILTER_BY_NAME';
export const CHANGE_FILTER_BY_NUMERIC_VALUES = 'CHANGE_FILTER_BY_NUMERIC_VALUES';
export const DELETE_FILTER_BY_NUMERIC_VALUES = 'DELETE_FILTER_BY_NUMERIC_VALUES';

const initialState = 
  [
    {
      name: '',
    },
    {
      numericValues: {
        column: '',
        comparison: '>',
        value: '',
      },
    },
  ];

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER_BY_NAME:
      return [
          { name: action.value },
          ...state.slice(1)
        ];
    case CHANGE_FILTER_BY_NUMERIC_VALUES:
      return [...state.map((item, index) => {
          if (index === action.id) {
            return {
              numericValues: {
                ...item.numericValues,
                [action.name]: action.value,
              },
            };
          }
          return item;
        })].concat(
          action.id === state.length - 1 && action.id < 5
            ? [{ numericValues: { column: '', comparison: '>', value: '' } }]
            : [],
        );
    case DELETE_FILTER_BY_NUMERIC_VALUES:
      return state.reduce((acc, item, index) => {
          if (action.id === index) {
            return acc;
          }
          return [...acc, item]
        }, []);
    default:
      return state;
  }
};

export default filtersReducer;
