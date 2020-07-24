'use strict';

const apiKey = 'ae0e9addd55b4e58a7d142653202207';
const searchUrl = 'https://api.weatherapi.com/v1/current.json?'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.error-message').empty();
    $('.results-list').empty();
    $('.clothing').empty();
    $('.results-list').append(`<li><h2>Temperature</h2>
    <p class="temp">${responseJson.current.temp_f}</p>
    <h2>Weather Conditions</h2>  <p>${responseJson.current.condition.text}</p></li>`);
    clothingSuggestion(responseJson.current.temp_f);
    $('.results').removeClass('hidden');

}


function getWeather(query) {

    let params = {
        key: apiKey,
        q: query
    };
    const queryString = formatQueryParams(params)
    const url = searchUrl + queryString;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('.error-message').text(`Something went wrong ${err.message}`);
        });
}


function clothingSuggestion(temp_f) {
    if (temp_f > 80) {
        $('.clothing').append("t shirt weather!")
    } else if (temp_f >= 60) {
        $('.clothing').append("no jacket needed")
    } else if (temp_f >= 50) {
        $('.clothing').append("you might want a light jacket")
    } else if (temp_f >= 40) {
        $('.clothing').append("a coat might be a good idea")
    } else if (temp_f >= 20) {
        $('.clothing').append("coat and scarf!")
    } else {
        $('.clothing').append("you might want to stay indoors!")
    }
    $('.clothing').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const location = $('#js-location').val();
        getWeather(location);
    });
}

$(watchForm);