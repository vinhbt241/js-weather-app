const WEATHER_API_KEY = '4acd642e09a418b582720e5119fcab06';

async function getLocation(cityName="", stateCode="", countryCode=""){
  try {
    const cityInfo = [cityName, stateCode, countryCode].filter(info => info != "").join(",");
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityInfo}&limit=5&appid=${WEATHER_API_KEY}`, {mode: 'cors'});
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

function convertKtoC(K) {
  if(isNaN(K)){
    console.log("Error! Input must be a number");
    return;
  }

  return Math.round(K - 273.15);
}

function getTimeStr() {
  let todayTime = new Date();
  const date = todayTime.getDate();
  const day = todayTime.toLocaleDateString('en-US', { weekday: 'short' });   
  const month = new Intl.DateTimeFormat('en-US', {month: 'short'}).format(todayTime);
  return `${day} ${date} ${month}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function generalizeInfo(info){
  const location = info.name;
  const displayLocation = document.getElementById("location");
  displayLocation.innerText = `Location: ${location}`;

  const time = getTimeStr();
  const displayTime = document.getElementById("time");
  displayTime.innerText = time;

  const temperature = convertKtoC(Number(info.main.temp));
  const displayTemp = document.getElementById("temp");
  displayTemp.innerText = `${temperature}°`;

  const feelsLike = convertKtoC(Number(info.main["feels_like"]));
  const displayFeelsLike = document.getElementById("feels-like");
  displayFeelsLike.innerText = `Feels like: ${feelsLike}°`;

  const displayDescription = document.getElementById("description");
  displayDescription.innerText = capitalizeFirstLetter(info.weather[0].description);

  const displayHumidity = document.getElementById("humidity");
  displayHumidity.innerText = `Humidity: ${info.main.humidity}%`;
}

const displayInfo = document.getElementById("display-info");

getLocation("Ho Chi Minh").then(location => {
  getWeatherInfo(location).then(weatherInfo => {
    console.log(weatherInfo);
    generalizeInfo(weatherInfo);
  })
})

const weatherForm = document.getElementById("weather-form");
weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  cityName = weatherForm['city-name'].value;

  getLocation(cityName).then(location => {
    getWeatherInfo(location).then(weatherInfo => {
      generalizeInfo(weatherInfo);
      console.log(weatherInfo);
    })
  })
})



