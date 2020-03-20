import {
  STORE_COLUMN_FILTER,
  STORE_COMPARISON_FILTER,
  STORE_VALUE_FILTER,
  REMOVE_FILTER,
} from '../components/FiltersByNumber';
import { ADD_NEW_FIELD } from '../components/Table';

const INITIAL_STATE = {
  filters: [
    {
      numericValues: {
        column: '',
        comparison: '',
        value: '',
      },
    },
  ],
};

export default function filterByNumericValue(state = INITIAL_STATE,
  {
    type, value: newValue, rowIndex,
  }) {
  const updateNumericValue = (field) => ({
    ...state,
    filters: state.filters.map((filter, index) => (
      (index === rowIndex) ? ({
        numericValues:
        { ...filter.numericValues, [[field]]: newValue },
      }) : filter
    )),
  });

  switch (type) {
    case STORE_COLUMN_FILTER:
      return updateNumericValue('column');
    case STORE_COMPARISON_FILTER:
      return updateNumericValue('comparison');
    case STORE_VALUE_FILTER:
      return updateNumericValue('value');
    case ADD_NEW_FIELD:
      return (state.filters.length < 5) ? ({
        ...state,
        filters: [
          ...state.filters, {
            numericValues: { column: '', comparison: '', value: '' },
          },
        ],
      })
        : state;
    case REMOVE_FILTER:
      return (state.filters.length === 1) ? ({
        ...state,
        filters: [
          {
            numericValues: { column: '', comparison: '', value: '' },
          },
        ],
      }
      )
        : ({
          ...state,
          filters: state.filters.filter((el, index) => index !== rowIndex),
        });
    default:
      return state;
  }
}
