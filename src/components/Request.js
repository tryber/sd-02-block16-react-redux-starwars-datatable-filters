import React from 'react';


const receivePlanets = () => ({
  type: RECEIVE_PLANETS,
})

function fetchPlanets() {
  return fetch('https://swapi.cp/api/planets')
  .then((response) => response.json());
  .then((data) => {
    dispatchEvent(receivePlanets(data.results));
  });
}

class Request extends React.Component {
render() {
  return (
  <div></div>
  );
}
}

export default Request;