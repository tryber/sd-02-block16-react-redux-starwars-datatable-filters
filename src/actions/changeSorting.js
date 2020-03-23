import { CHANGE_SORTING } from '../reducers/sortingReducer';

const changeSorting = (event) => {
  const { name, value } = event.target;
  return {
    type: CHANGE_SORTING,
    name,
    value,
  };
};

export default changeSorting;
