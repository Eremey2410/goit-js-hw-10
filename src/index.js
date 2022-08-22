import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import API from './api-service';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

// при вводе значения в инпут вызывается функция запроса на сервер
function onInputChange(event) {
   let inputNameCountry = event.target.value.trim();
  console.log(inputNameCountry);

  fetchCountries(inputNameCountry)
    .then(addMarcup)
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

// запрос на сервер
function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    console.log(response);
    return response.json();
  });
}

// добавление html разметки
function addMarcup(country) {
  const properties = country;

  console.log(country.length);
  if (country.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (country.length >= 2 && country.length <= 10) {
   const markupFlags = properties.map(
      property =>
        ` <img src="${property.flags.svg}" alt="${property.name.common}" />
      ${property.name.common}`
    );
    refs.countryInfo.innerHTML = markupFlags;
  if (country.length === 1) {
    const markup = properties
      .map(
        property =>
          `<li class="country-item"> <p class="country-text">Capital:<span class= "country-info-description"> ${
            property.capital
          }</span></p></li>
          <li class="country-item"> <p class="country-text">Population:<span class= "country-info-description"> ${
            property.population
          }</span></p></li>
          <li class="country-item"> <p class="country-text">Languages:<span class= "country-info-description"> ${Object.values(
            property.languages
          )}</span></p></li>`
      )
      .join('');
    refs.countryList.innerHTML = markup;
    
    
  }
}

  



























  










  
// import './css/styles.css';
// import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// // import API from './api-service';
// const DEBOUNCE_DELAY = 300;

// const refs = {
//   input: document.querySelector('#search-box'),
//   countryList: document.querySelector('.country-list'),
//   countryInfo: document.querySelector('.country-info'),
// };

// refs.input.addEventListener('input', debounce(onInputChange, 300));
// let inputNameCountry = '';

// // при вводе значения в инпут вызывается функция запроса на сервер
// function onInputChange(event) {
//   inputNameCountry = event.target.value.trim();
//   console.log(inputNameCountry.length);

//   fetchCountries(inputNameCountry)
//     .then(addMarcup)
//     .catch(error => {
//       Notify.failure('Oops, there is no country with that name');
//     });
// }

// // запрос на сервер
// function fetchCountries(name) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   ).then(response => {
//     console.log(response);
//     return response.json();
//   });
// }

// // добавление html разметки
// function addMarcup(countries) {
//   // const properties = country;

//   console.log(countries.length);
//   if (countries.length > 10) {
//     Notify.info('Too many matches found. Please enter a more specific name.');
//   }
//   if (countries.length >= 2 && countries.length <= 10) {
//     refs.countryList.insertAdjacentHTML(
//       'beforeend',
//       createListItems(countries)
//     );
//   }
//   if (countries.length === 1) {
//     refs.countryInfo.insertAdjacentHTML('beforeend', createInfo(countries));
//   }
// }

// function createListItems(countries) {
//   return countries
//     .map(
//       country =>
//         `<li class="country-item"><img src="${country.flags.svg}" alt="${
//           country.name.common
//         }"/> <span class="country-name">${country.name.common}</span></li>
//           <li class="country-item"> <p class="country-text">Capital:<span class= "country-info-description"> ${
//             country.capital
//           }</span></p></li>
//           <li class="country-item"> <p class="country-text">Population:<span class= "country-info-description"> ${
//             country.population
//           }</span></p></li>
//           <li class="country-item"> <p class="country-text">Languages:<span class= "country-info-description"> ${Object.values(
//             country.languages
//           )}</span></p></li>`
//     )
//     .join('');
// }
// function createInfo() {
//   return `<ul class="country-info-list">
//   <li class="country-info-item"><img src="${country.flags.svg}" alt="${country.name.common}"/> <span class="country-name">${country.name.common}</span></li>
//         <li class="country-info-item"><p class="country-text">Capital:<span class= "country-info-description"> ${country.capital}</span></p></li>
//         <li class="country-info-item"><p class="country-text">Capital:<span class= "country-info-description"> ${country.capital}</span></p></li>
//         <li class="country-info-item"><p class="country-text">Capital:<span class= "country-info-description"> ${country.capital}</span></p></li>
// </ul>`;
// }
