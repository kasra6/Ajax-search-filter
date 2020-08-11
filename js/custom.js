function search(searchWord, cities){
  return cities.filter(place => {
    const regEx = new RegExp(searchWord, 'gi');
    return place.city_name.match(regEx) || place.province_name.match(regEx);
  })
}

function displayResults(){
  const matchArray = search(this.value, cities);
  const html = matchArray.map(place => {
    const regEx = new RegExp(this.value, 'gi');
    const cityName = place.city_name.replace(regEx, `<span class="hl">${this.value}</span>`);
    const stateName = place.province_name.replace(regEx, `<span class="hl">${this.value}</span>`);
    return `
      <li><span>${cityName}, ${stateName}</span></li>
    `
  }).join('');
  console.log(html);
  resultList.innerHTML = html;
}

const cityResource = "../assets/iran.json";
const cities = [];

fetch(cityResource)
  .then(blob => blob.json())
  .then(data => cities.push(...data));


const searchInput = document.querySelector("input[name='search']");
searchInput.addEventListener('keyup', displayResults);

const resultList = document.querySelector("ul[name='results']");
console.log(resultList);
