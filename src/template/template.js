export function countriesList(value) {
  return `<li class="country-unit">
  <img src="${value.flags.png}" alt="flag" width = "7%" height = "auto">
  <p>${value.name}</p>
  </li>`;
}

export function countryDescription(value) {
  return `<h1 class = "country-header"><img src="${
    value.flags.png
  }" alt="flag" width = "7%" height = "auto"></img>${value.name}</h1>
  <ul class ="country-list">
  <li class="description-list">Capital: ${value.capital}</li>
  <li class="description-list">Population: ${value.population}</li>
  <li class="description-list">Languages: ${value.languages.map(
    lang => lang.name
  )}</li>
  </ul>`;
}

{
  /* <svg width="25" height="25">
  <use href="${value.flags.svg}"></use>
</svg> */
}
