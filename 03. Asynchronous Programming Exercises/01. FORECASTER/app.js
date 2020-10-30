import * as data from './data.js';
function attachEvents(){
    const submit = document.getElementById("submit");
    let forecastDIV = document.getElementById("forecast");
    let currentDIV = document.getElementById("current");
    let upcomingDIV = document.getElementById("upcoming");
    const errorDIV = ce("div", "Error");

    const symbols = {
        Sunny: "☀",
        Partlysunny: "⛅",
        Overcast: "☁",
        Rain: "☂",
        degrees: "°"
    };

    submit.addEventListener("click", getForecast);

    async function getForecast(){
        const location = document.getElementById("location").value;
        forecastDIV.style.display = "block";
        if(currentDIV.children[1]){
            currentDIV.children[1].remove();
            upcomingDIV.children[1].remove();
        }
        if (forecastDIV.children[2]) {
            forecastDIV.children[2].remove();
        }
        let code = "";
        try{
            code = await data.getCode(location);
        }  catch(err){
            forecastDIV.appendChild(errorDIV);
            return;
        }
        const todayFunc = data.getToday(code);
        const upcomingFunc = data.getUpcoming(code);
        const [today, upcoming] = [await todayFunc, await upcomingFunc];
        document.getElementById("location").value = "";

        // Forecast for Today HTML
        let forecastsDIV = ce("div", "", "forecasts");
        currentDIV.appendChild(forecastsDIV);
        let conditionSymbolSpan = ce("span", displaySymbol(today.forecast.condition),"condition symbol");
        forecastsDIV.appendChild(conditionSymbolSpan);
        let conditionSpan = ce("span", "", "condition");
        forecastsDIV.appendChild(conditionSpan);
        let nameSpan = ce("span", today.name, "forecast-data");
        let degreeSpan = ce("span", `${today.forecast.low}${symbols.degrees}/${today.forecast.high}${symbols.degrees}`, "forecast-data");
        let conditionNameSpan = ce("span", today.forecast.condition, "forecast-data");
        conditionSpan.appendChild(nameSpan);
        conditionSpan.appendChild(degreeSpan);
        conditionSpan.appendChild(conditionNameSpan);

        // Forecast for upcoming Days HTML
        let forecastInfoDIV = ce("div", "", "forecast-info");
        upcomingDIV.appendChild(forecastInfoDIV);
        for (const a of Array.from(upcoming.forecast)) {
            let upcomingSpan = ce("span", "", "upcoming");
            let symbolSpan = ce("span", displaySymbol(a.condition),"symbol");
            let degreeSpan = ce("span", `${a.low}${symbols.degrees}/${a.high}${symbols.degrees}`, "forecast-data");
            let conditionSpan = ce("span", a.condition,"forecast-data");
            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(degreeSpan);
            upcomingSpan.appendChild(conditionSpan);
            forecastInfoDIV.appendChild(upcomingSpan);
        } 
    }

    function displaySymbol(condition){
        let result;
        if (condition === "Sunny") {
            result = symbols.Sunny;
        } else if(condition === "Partly sunny"){
            result = symbols.Partlysunny;
        } else if(condition === "Overcast"){
            result = symbols.Overcast;
        } else if(condition === "Rain"){
            result = symbols.Rain;
        }
        return result;
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