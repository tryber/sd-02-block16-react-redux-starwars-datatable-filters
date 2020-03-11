export const FILTER_BY_NAME = 'FILTER_BY_NAME';

const receiveFilterByName = (name) => ({
  type: FILTER_BY_NAME,
  filters: [{ name }],
});

export function filterByName({ target: { value } }) {
  return (dispatch) => (
    dispatch(receiveFilterByName(new RegExp(value)))
  );
}
