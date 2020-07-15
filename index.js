'use strict';

const apiKey = 'QChdX726JRzWf9mcRzxjQZ4qmf3PioBS';


function getWeather(lat, lng) {
    let url = `https://api.climacell.co/v3/weather/realtime?lat=${lat}&lon=${lng}&unit_system=us&fields=temp%2Cprecipitation`
    let options = {
        headers: new Headers({
            'apikey': apiKey
        })
    };
    fetch(url, options)
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

function displayResults(responseJson) {
    console.log(responseJson);
    $('.results-list').empty();
    $('.results-list').append(`<li><p>${responseJson.temp.value}</p>
    <h3>Precipitation</h3>  <p>${responseJson.precipitation.value}</p></li>`)
    $('.results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const lat = $('#js-lat').val();
        const lng = $('#js-lng').val();
        getWeather(lat, lng);
    });
}

$(watchForm);