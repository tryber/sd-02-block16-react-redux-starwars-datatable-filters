export const CHANGE_SORTING = 'CHANGE_SORTING';

const initialState = {
  column: 'name',
  order: 'ASC',
};

const sortingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SORTING:
      return {
        ...state,
        [action.name]: action.value,
      };

    default:
      return state;
  }
};

export default sortingReducer;
