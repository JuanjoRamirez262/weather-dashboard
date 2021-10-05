var APIKey = '15c44cecea6e80886a8c36aca1ef9001';
var rootEl = $('#root');
var resultRootEl = document.getElementById('resultRoot')
var futureDaysArray = document.getElementById('5day-forecast').children[0]
var searchBox = document.querySelector('.searchbar')

function addSearchHistorial(city) {
    var newElement = $('<button>');
    newElement.addClass('badge badge-primary col-xl-9');
    newElement.attr('data-city', city)
    newElement.text(city)
    rootEl.append(newElement);
}

function getApiInfo(city) {
    city = city.replace(' ', '_')
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey
    console.log(requestUrl)
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var requestUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=hourly,minutely&appid=' + APIKey
            fetch(requestUrl2)
                .then(response2 => {
                    return response2.json();
                })
                .then(data2 => {
                    resultRootEl.children[0].children[0].children[0].children[0].textContent = city
                    resultRootEl.children[0].children[0].children[0].children[1].textContent = 'Temp: ' + data2.current.temp + '°F'
                    resultRootEl.children[0].children[0].children[0].children[2].textContent = 'Wind: ' + data2.current.wind_speed + ' MPH'
                    resultRootEl.children[0].children[0].children[0].children[3].textContent = 'Humidity: ' + data2.current.humidity + '%'
                    resultRootEl.children[0].children[0].children[0].children[4].textContent = 'UV index: ' + data2.current.uvi
                    console.log(data2)

                    for (let i = 1; i < 6; i++) {
                        futureDaysArray.children[i - 1].children[0].children[0].textContent = moment(data2.daily[i].dt, 'X').format('MM/DD/YYYY')
                        futureDaysArray.children[i - 1].children[0].children[1].setAttribute('src', 'http://openweathermap.org/img/wn/' + data2.daily[i].weather[0].icon + '.png')
                        futureDaysArray.children[i - 1].children[0].children[2].textContent = 'Temp: ' + data2.daily[i].temp.day
                        futureDaysArray.children[i - 1].children[0].children[3].textContent = 'Wind: ' + data2.daily[i].wind_speed + 'MPH'
                        futureDaysArray.children[i - 1].children[0].children[4].textContent = 'Humidity: ' + data2.daily[i].humidity + '%'
                    }
                })
        });
}

searchBox.addEventListener('click', function (event) {
    event.preventDefault();
    element = event.target;

    if (element.matches('#searchBtn')) {
        var city = document.getElementById('searchText').value
        addSearchHistorial(city)
        getApiInfo(city)
    } else if (element.matches('.badge')) {
        var city = element.getAttribute('data-city')
        getApiInfo(city)
    }
})