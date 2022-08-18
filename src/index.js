import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputChange, 300));
function onInputChange() {}

fetchCountries();
function fetchCountries(name) {}
fetch(
  'https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages '
)
  .then(response => {
    console.log(response.json());
    return response.json();
  })
  .then(peru => {
    console.log(peru);
  });
