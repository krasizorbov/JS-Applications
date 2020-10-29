function attachEvents() {
    // Все още не е завършено работи на 85%
    const location = document.getElementById("location");
    const submit = document.getElementById("submit");
    let forecastDIV = document.getElementById("forecast");
    let currentDIV = document.getElementById("current");
    let upcomingDIV = document.getElementById("upcoming");

    const symbols = {
        Sunny: "☀",
        Partlysunny: "⛅",
        Overcast: "☁",
        Rain: "☂",
        degrees: "°"
    };

    submit.addEventListener("click", getLocationAndCode);

    let name = location.value[0].toUpperCase() + location.value.substring(1);
    let code;
    let error = "Error";
    function getLocationAndCode(){
        const clURL = `https://judgetests.firebaseio.com/locations.json`;
        fetch(clURL)
        .then(response => response.json())
        .then(result => {
            for (const key in result) {
                if (result[key].name === name) {
                    code = result[key].code;
                }
            }
            forecastDIV.style.display = "block";
            getCurrentConditions(code);
            getThreeDaysForecast(code);
        })
        .catch()
    }

    function getThreeDaysForecast(code){
        let tdcURL = `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`;
        fetch(tdcURL)
        .then(response => response.json())
        .then(result => {
            let arr = [];
            for (const key in result.forecast) {
                let obj = {
                    condition: result.forecast[key].condition,
                    low: result.forecast[key].low,
                    high: result.forecast[key].high
                }
                arr.push(obj);
            }
            createHTMLforUpcomingDays(arr);
        })
        .catch();

        function createHTMLforUpcomingDays(arr){
            let forecastDIV = ce("div", "", "forecast-info");
            upcomingDIV.appendChild(forecastDIV);
            for (const a of arr) {
                let upcomingSpan = ce("span", "", "upcoming");
                let symbolSpan = ce("span", displaySymbol(a.condition), "symbol");
                let degreeSpan = ce("span", `${a.low}/${a.high}`, "forecast-data");
                let conditionSpan = ce("span", a.condition, "forecast-data");
                upcomingSpan.appendChild(symbolSpan);
                upcomingSpan.appendChild(degreeSpan);
                upcomingSpan.appendChild(conditionSpan);
                forecastDIV.appendChild(upcomingSpan);
            }
        }
    }

    function getCurrentConditions(code){
        let ccURL = `https://judgetests.firebaseio.com/forecast/today/${code}.json `;
        fetch(ccURL)
        .then(response => response.json())
        .then(result => {
            let name = result.name;
            let condition = result.forecast.condition;
            let conditionSymbol = displaySymbol(condition); 
            let high = result.forecast.high + symbols.degrees;
            let low = result.forecast.low + symbols.degrees;
            createHTMLforCurrentConditions(name, conditionSymbol, high, low, condition);
        })
        .catch();

        function createHTMLforCurrentConditions(name, conditionSymbol, high, low, condition){
            let forecastsDIV = ce("div", "", "forecasts");
            currentDIV.appendChild(forecastsDIV);
            let conditionSymbolSpan = ce("span", conditionSymbol, "condition symbol");
            forecastsDIV.appendChild(conditionSymbolSpan);
            let conditionSpan = ce("span", "", "condition");
            forecastsDIV.appendChild(conditionSpan);
            let nameSpan = ce("span", name, "forecast-data");
            let degreeSpan = ce("span", `${low}/${high}`, "forecast-data");
            let conditionNameSpan = ce("span", condition, "forecast-data");
            conditionSpan.appendChild(nameSpan);
            conditionSpan.appendChild(degreeSpan);
            conditionSpan.appendChild(conditionNameSpan);
        }
    }

    function displaySymbol(condition){
        if (condition === "Sunny") {
            conditionSymbol = symbols.Sunny;
        } else if(condition === "Partly sunny"){
            conditionSymbol = symbols.Partlysunny;
        } else if(condition === "Overcast"){
            conditionSymbol = symbols.Overcast;
        } else if(condition === "Rain"){
            conditionSymbol = symbols.Rain;
        }
        return conditionSymbol;
    }

    function ce(el, text, className, id) {
        let e = document.createElement(el);
        if (text) {
          e.textContent = text;
        }
        if (className) {
          e.classList = className;
        }
        if (id) {
          e.id = id;
        }
        return e;
      }
}
attachEvents();