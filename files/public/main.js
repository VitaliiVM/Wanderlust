// Foursquare API Info
const clientId = 'W3MKJVJCADH2JR4ZJSP0LQ1NLCR0J24SRT5FAAG5AT3XLVEX';
const clientSecret = '\n' +
    'OVSGWKFD3FGH1402O1N5PENVOURSREJ3GW2CWJNJEOB21JG1';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = 'ef92b0ba953f16e9b89d41acfec48e70\n';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
    const city = $input.val();
    const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20210309`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
            console.log(venues);
            return venues;
        }
    } catch (e) {
        console.log(e);
    }
}

const getForecast = async () => {
    const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
          const jsonResponse = await response.json();
          console.log(jsonResponse);
          return jsonResponse;
      }
    } catch (e) {
        console.log(e);
    }
}


// Render functions
const renderVenues = (venues) => {
    $venueDivs.forEach(($venue, index) => {
        const venue = venues[index];
        const venueIcon = venue.categories[0].icon;
        const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
        let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
        $venue.append(venueContent);
    });
    $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
    const weatherContent = createWeatherHTML(day);
    $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
    $venueDivs.forEach(venue => venue.empty());
    $weatherDiv.empty();
    $destination.empty();
    $container.css("visibility", "visible");
    getVenues().then(venues => renderVenues(venues));
    getForecast().then(forecast => renderForecast(forecast));
    return false;
}

$submit.click(executeSearch)