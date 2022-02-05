import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const input = document.querySelector('#search-box');

input.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry() {
  let name = input.value.trim();
  if (!name) {
    countryList.innerHTML = '';
    return;
  }

  fetchCountries(name)
    .then(countrys => {
      render(countrys);
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
    });
}

function render(countrys) {
  if (countrys.length > 10) {
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  const markup = countrys
    .map(country => {
      if (countrys.length > 1) {
        return `<li>
                  <div class="country-name">
                    <img width="30" height="20"   src='${country.flags.svg}'></>
                    <p style="font-size: 24px">&nbsp&nbsp${country.name}</p>
                  </div>
                </li>`;
      } else {
        return `<li>
                  <div class="country-name">
                    <img width="60" height="40"   src='${country.flags.svg}'></>
                    <p><b style="font-size: 36px">&nbsp&nbsp${country.name}</b></p>
                  </div>
                <p class="country-discription"><b>Capital</b>: ${country.capital}</p>
                <p class="country-discription"><b>Population</b>: ${country.population}</p>
                <p class="country-discription"><b>Languages</b>: ${Object.values(
                  country.languages.map(lang => lang.name),
                )}</p>
              </li>`;
      }
    })
    .join('');

  countryList.innerHTML = markup;
}
