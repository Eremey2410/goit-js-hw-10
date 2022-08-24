import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './api-service';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

// при вводе значения в инпут вызывается функция запроса на сервер
function onInputChange(event) {
  const inputNameCountry = event.target.value.trim();
  // console.log(inputNameCountry);

  if (inputNameCountry === '') {
    return;
  }
  API.fetchCountries(inputNameCountry)
    .then(addMarcups)
    .catch(error => {
      console.log(error);
      throw new Error(
        Notify.failure('Oops, there is no country with that name')
      );
      // Notify.failure('Oops, there is no country with that name');
    });
}
// очистка разметки
function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
// добавление html разметки
function addMarcups(country) {
  const properties = country;

  clearMarkup();

  // console.log(country.length);
  if (country.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (country.length >= 2 && country.length <= 10) {
    addMarkupInfo(properties);
  } else {
    addMarkupList(properties);
  }
}
function addMarkupList(properties) {
  const markup = properties
    .map(
      property =>
        `<li class="country-item"> <img src="${property.flags.svg}" alt="${
          property.name.common
        }" />
      <span class="list-description"> ${property.name.common}</span></li>
          <li class="country-item"> <p class="country-text">Capital:<span class= "country-list-description"> ${
            property.capital
          }</span></p></li>
          <li class="country-item"> <p class="country-text">Population:<span class= "country-list-description"> ${
            property.population
          }</span></p></li>
          <li class="country-item"> <p class="country-text">Languages:<span class= "country-list-description"> ${Object.values(
            property.languages
          )}</span></p></li>`
    )
    .join('');
  refs.countryList.innerHTML = markup;
}

function addMarkupInfo(properties) {
  const markupFlags = properties
    .map(
      property =>
        `<div class="country-info-one"><img src="${property.flags.svg}" alt="${property.name.common}" />
     <span class="country-info-one-description"> ${property.name.common}</span></div>`
    )
    .join('');
  refs.countryInfo.innerHTML = markupFlags;
}
