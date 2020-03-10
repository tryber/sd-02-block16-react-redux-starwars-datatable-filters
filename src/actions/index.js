const REQUEST_SWAPI = 'REQUEST_SWAPI';
const REQUEST_SWAPI_SUCCESS = 'REQUEST_SWAPI_SUCCESS';
const REQUEST_SWAPI_FAILURE = 'REQUEST_SWAPI_FAILURE';

const requestSwapi = () => ({
  type: REQUEST_SWAPI,
});

const requestSwapiSuccess = (data) => ({
  type: REQUEST_SWAPI_SUCCESS,
  data,
});
