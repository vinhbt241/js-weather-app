const WEATHER_API_KEY = '4acd642e09a418b582720e5119fcab06'

async function getLocation(cityName="", stateCode="", countryCode=""){
  try {
    const cityInfo = [cityName, stateCode, countryCode].filter(info => info != "").join(",");
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInfo}&limit=5&appid=${WEATHER_API_KEY}`, {mode: 'cors'});
    const location = await response.json();
    return {"lat": location[0].lat, "lon": location[0].lon};
  } catch {
    console.log("Oops, error!");
  }
}

async function getWeatherInfo(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}`, {mode: 'cors'});
    const weatherInfo = response.json();
    return weatherInfo;
  } catch {
    console.log("Oops, error!");
  }
}

const weatherForm = document.getElementById("weather-form");
weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  cityName = weatherForm['city-name'].value;
  getLocation(cityName).then(location => {
    getWeatherInfo(location).then(info => {
      console.log(info);
    })
  })
})



