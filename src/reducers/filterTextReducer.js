import { FILTER_TEXT } from '../actions/textActions';

const initialTextState = {
  filters: [
    {
      name: '',
      number: 0,
    },
  ],
};

const FilterTextReducer = (state = initialTextState, action) => {
  console.log('Current state:', state, 'received action:', action);
  switch (action.type) {
    case FILTER_TEXT:
      return {
        ...state,
        filters: [{ name: action.typing }],
      };
    default: return state;
  }
};

export default FilterTextReducer;
