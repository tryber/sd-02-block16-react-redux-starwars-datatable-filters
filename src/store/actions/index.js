import getarrayPlanets from '../../services/apiRequest';

const receiveSWplanetsSuccess = ({ results }) => ({ type: 'SUCCESS', results });
const receiveSWplanetsFailure = (error) => ({ type: 'FAILURE', error });

export default function fetchSWplanets() {
  return (dispatch) => (
    getarrayPlanets()
      .then(
        (planets) => dispatch(receiveSWplanetsSuccess(planets)),
        (error) => dispatch(receiveSWplanetsFailure(error.message)),
      )
  );
}
