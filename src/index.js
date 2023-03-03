import Notiflix from 'notiflix';
import './css/styles.css';
import { countriesList, countryDescription } from './template/template';
import { fetchCountries } from './api/fetchCountries';

const inputEl = document.querySelector('#search-box');
const ulEl = document.querySelector('.country-list');

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const inputValue = evt.target.value.trim();
  fetchCountries(inputValue)
    .then(res => {
      return res.json();
    })
    .then(value => {
      if (value.length >= 10) {
        Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      clear();
      const templateUnit = value.map(unit => {
        console.log(unit);
        if (value.length <= 1) {
          createCountryDescription(unit);
          return;
        }
        createCountriesList(unit);
      });
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log(error);
    });
}

function clear() {
  ulEl.innerHTML = '';
}

function createCountriesList(array) {
  return ulEl.insertAdjacentHTML('beforeend', countriesList(array));
}

function createCountryDescription(array) {
  return ulEl.insertAdjacentHTML('beforeend', countryDescription(array));
}
