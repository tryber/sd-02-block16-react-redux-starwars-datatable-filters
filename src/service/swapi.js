const SWAPI_ENDPOINT = 'https://swapi.co/api/';

function getEndPointSwAPI() {
    const url = `${SWAPI_ENDPOINT}`;
    fetch(url)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((e) => console.error(e))
}

export default getEndPointSwAPI;



