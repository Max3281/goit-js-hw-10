import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';

const inputEl = document.querySelector('#search-box');
const ulEl = document.querySelector('.country-list');

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const inputValue = evt.target.value;
  if (inputValue === '') {
    return;
  }
  clear();
  fetchCountries(inputValue)
    .then(value => {
      if (value.length > 10) {
        Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (value.length === 1) {
        createDescriptionMarkup(value);
        return;
      }
      createListMarkup(value);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      // Notiflix.Notify.failure(`${error}`);
      console.log(error);
    });
}

function clear() {
  ulEl.innerHTML = '';
}

function createListMarkup(array) {
  let templateUnit = array
    .map(unit => {
      return `<li class="country-unit">
  <svg width="25" height="25">
  <use href="${unit.flags.svg}"></use>
</svg>
  <p>${unit.name}</p>
  </li>`;
    })
    .join('');
  return ulEl.insertAdjacentHTML('beforeend', templateUnit);
}

function createDescriptionMarkup(array) {
  let templateUnit = array
    .map(unit => {
      return `<h1 class = "country-header"><svg width="50" height="50">
  <use href="${unit.flags.svg}"></use>
</svg>${unit.name}</h1>
  <ul class ="country-list">
  <li class="description-list">Capital: ${unit.capital}</li>
  <li class="description-list">Population: ${unit.population}</li>
  <li class="description-list">Languages: ${unit.languages.map(
    lang => lang.name
  )}</li>
  </ul>`;
    })
    .join('');
  return ulEl.insertAdjacentHTML('beforeend', templateUnit);
}
