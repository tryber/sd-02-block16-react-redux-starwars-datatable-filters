import { FILTER_TEXT } from '../actions/textActions';

const initialTextState = {
  filters: [
    {
      name: '',
    },
  ],
};

const FilterTextReducer = (state = initialTextState, action) => {
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
