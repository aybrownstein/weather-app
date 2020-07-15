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
    $('.clothing').empty();
    $('.results-list').append(`<li><h2>Temperature</h2>
    <p class="temp">${responseJson.temp.value}</p>
    <h3>Precipitation</h3>  <p>${responseJson.precipitation.value}</p></li>`);
    $('.results').removeClass('hidden');
    clothingSuggestion();
}

function clothingSuggestion() {
    if ($('.temp') > 80) {
        $('.clothing').append("t shirt weather!")
    } else if ($('.temp') >= 60) {
        $('.clothing').append("no jacket needed")
    } else if ($('.temp') >= 50) {
        $('.clothing').append("you might want a light jacket")
    } else if ($('.temp') >= 40) {
        $('.clothing').append("a coat might be a good idea")
    } else if ($('.temp') >= 20) {
        $('.clothing').append("coat and scarf!")
    } else {
        $('.clothing').append("you might want to stay indoors!")
    }
    $('.clothing').removeClass('hidden');
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