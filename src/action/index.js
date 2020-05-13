import fetchApi from '../services/api';

const testando = (resolve) => ({
  type: 'test',
  test: resolve,
});

export default function evento() {
  return (dispatch) => (
    fetchApi()
      .then(
        (resolve) => (dispatch(testando(resolve))),
      )
  );
}
