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
        column: '',
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
      // return {
      //   ...state,
      //   filters: state.filters.slice(0, action.id).concat({numericValues: {...state.filters(action.id), [action.name]: action.value}}).concat(state.filters.slice(action.id + 1))}
      return {
        ...state,
        filters: //(action.id > state.filters.length - 1)
          // ? [
          //     ...state.filters,
          //     {
          //       numericValues: {
          //         ...state.filters.numericValues,
          //         [action.name]: action.value,
          //       },
          //     },
          //   ]
          /*:*/[ ...state.filters.map((item, index) => {
              if (index === Number(action.id)) {
                return {
                  numericValues: {
                    ...item.numericValues,
                    [action.name]: action.value,
                  },
                };
              }
              return item;
            })
          ].concat((Number(action.id) === state.filters.length - 1 && Number(action.id) < 5)
            ? [{numericValues: {column: '', comparison: '>', value: ''}}]
            : []
          )
          //   {
          //     numericValues: {
          //       column: 'population',
          //       comparison: '>',
          //       value: '',
          //     },
          //   }
          // ]
      }
        //};
        //     state.filters[0],
      //     {
      //       numericValues: {
      //         ...state.filters[1].numericValues,
      //         [action.name]: action.value,
      //       },
      //     },
      //   ],
      // };
    case 'CANCEL_FILTER_BY_NUMERIC_VALUES':
      return {
        ...state,
        filters: state.filters.reduce((acc, item, index) => {
          if (Number(action.id) === index) {
            return acc;
          }
          return [...acc, item]
        }, [])
      };
    default: return state;
  }
};

export const store = createStore(reducer, applyMiddleware(thunk));
