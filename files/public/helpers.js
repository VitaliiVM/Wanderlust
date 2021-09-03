const createVenueHTML = (name, location, iconSource) => {
    return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <h3>Address:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`;
}

const createWeatherHTML = (currentDay) => {
    console.log(currentDay.wind.speed);
    let countryWeather = kelvinToCelcius(currentDay.main.temp);
    let degree = 'C';

    if (currentDay.sys.country === 'US' || currentDay.sys.country === 'GB') {
        countryWeather = kelvinToFahrenheit(currentDay.main.temp);
        degree = 'F';
    }
    return `<h2>${weekDays[(new Date()).getDay()]}</h2>
		<h2>Temperature: ${countryWeather}&deg;${degree}</h2>
		<h2>Wind speed: ${(currentDay.wind.speed).toFixed(0)} m/s</h2>
		<h2>Condition: ${currentDay.weather[0].description}</h2>
  	<img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
}

const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);
const kelvinToCelcius = k => ((k - 273.15).toFixed(0));