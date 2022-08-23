export default { fetchCountries };

const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}`)
    .then(response =>
      // console.log(response.json());
      response.json()
    )
    .catch(error => {
      throw new Error(
        Notify.failure('Oops, there is no country with that name')
      );
    });
}
