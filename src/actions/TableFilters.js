export const FILTER_RESULTS = 'FILTER_RESULTS';

const getFilterResults = (filterResults) => ({
  type: FILTER_RESULTS,
  filterResults,
});

export const gotResults = (results) => {
  return (dispatch) => (
    dispatch(getFilterResults(results))
  );
};
