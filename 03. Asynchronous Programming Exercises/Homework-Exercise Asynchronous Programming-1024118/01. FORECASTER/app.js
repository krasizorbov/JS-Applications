function attachEvents() {

    const locationsURL = 'https://judgetests.firebaseio.com/locations.json'
    const baseURL = 'https://judgetests.firebaseio.com/forecast/'
    let locationName = document.getElementById('location')
    let getWeatherBtn = document.getElementById('submit')

    let weatherIcons = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176'
    }

    getWeatherBtn.addEventListener('click', () => {
        fetch(locationsURL)
            .then(res => res.json())
            .then(data => {
                let { code } = data.find(x => x.name === locationName.value)

                let todayWeather = fetch(`${baseURL}today/${code}.json`)
                    .then(res => res.json())

                let upcomingWeather = fetch(`${baseURL}upcoming/${code}.json`)
                    .then(res => res.json())

                Promise.all([todayWeather, upcomingWeather])
                    .then(([todayData, upcomingData]) => {
                        document.getElementById('forecast').style = 'display:block'
                        appendTodayWeather(todayData)
                        appendUpcomingWeather(upcomingData)
                    })
            })
            .catch(() => displayError())
    })

    function appendTodayWeather(data) {
        clearFields()
        let currentWeatherDiv = document.getElementById('current')
        currentWeatherDiv.style = 'display:block'

        let forecasts = document.createElement('div')
        let spanSymbol = document.createElement('span')
        let spanCondition = document.createElement('span')
        let spanCityName = document.createElement('span')
        let spanDegrees = document.createElement('span')
        let spanWeather = document.createElement('span')

        forecasts.className = 'forecasts'
        spanSymbol.className = 'condition symbol'
        spanCondition.className = 'condition'
        spanCityName.className = 'forecast-data'
        spanDegrees.className = 'forecast-data'
        spanWeather.className = 'forecast-data'

        spanSymbol.innerHTML = weatherIcons[data.forecast.condition]
        spanCityName.innerHTML = data.name
        spanDegrees.innerHTML = `${data.forecast.low}${weatherIcons['Degrees']}/${data.forecast.high}${weatherIcons['Degrees']}`
        spanWeather.innerHTML = data.forecast.condition

        spanCondition.appendChild(spanCityName)
        spanCondition.appendChild(spanDegrees)
        spanCondition.appendChild(spanWeather)
        forecasts.appendChild(spanSymbol)
        forecasts.appendChild(spanCondition)
        currentWeatherDiv.appendChild(forecasts)
    }

    function appendUpcomingWeather(data) {

        let upcomingWeatherDiv = document.getElementById('upcoming')
        upcomingWeatherDiv.style = 'display:block'
        let forecastInfo = document.createElement('div')

        for (let i = 0; i < 3; i++) {
            let spanUpcoming = document.createElement('span')
            let spanSymbol = document.createElement('span')
            let spanDegrees = document.createElement('span')
            let spanCondition = document.createElement('span')

            spanUpcoming.className = 'upcoming'
            spanSymbol.className = 'symbol'
            spanDegrees.className = 'forecast-data'
            spanCondition.className = 'forecast-data'

            spanSymbol.innerHTML = weatherIcons[data.forecast[i].condition]
            spanDegrees.innerHTML = `${data.forecast[i].low}${weatherIcons['Degrees']}/${data.forecast[i].high}${weatherIcons['Degrees']}`
            spanCondition.innerHTML = data.forecast[i].condition

            spanUpcoming.appendChild(spanSymbol)
            spanUpcoming.appendChild(spanDegrees)
            spanUpcoming.appendChild(spanCondition)
            forecastInfo.appendChild(spanUpcoming)
        }
        upcomingWeatherDiv.appendChild(forecastInfo)
    }

    function displayError() {
        document.getElementById('forecast').style = 'display:block'
        document.getElementsByClassName('label')[0].innerHTML = 'Error'
        document.getElementById('upcoming').style = 'display:none'

        let forecasts = document.getElementsByClassName('forecasts')
        Array.from(forecasts).forEach(x => {
            x.remove()
        })
    }

    function clearFields(){
        let currentWeatherDiv = document.getElementById('current')
        currentWeatherDiv.innerHTML = '<div class="label">Current conditions</div>'
        let upcomingWeatherDiv = document.getElementById('upcoming')
        upcomingWeatherDiv.innerHTML = '<div class="label">Three-day forecast</div>'
    }
}

attachEvents()