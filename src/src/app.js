function searchWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar").value;
  search(searchInput);
}
function search(city) {
  let apiKey = `be81f193e065bf5feb2d944c7336968b`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(showTemp);
}
function getDetails(position) {
  console.log(position);
  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let long = position.coord.lon;
  let lat = position.coord.lat;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&untits=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  console.log(response.data);
  document.querySelector("#search-input").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#deg");
  temperatureElement.innerHTML = `${temperature} °C`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
}

function searchCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getDetails);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", searchWeather);
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", searchCurrentWeather);

let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
let dayTime = document.querySelector("#day-time");
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dayTime.innerHTML = ` ${day}, ${hours}:${minutes}`;
search("Ahvaz");
