function getInfo() {
    let baseURL = 'https://judgetests.firebaseio.com/businfo/{stopId}.json';

    let stopID = document.querySelector("#stopId");
    let stationName = document.querySelector("#stopName");
    let busesEl = document.querySelector("#buses");

    let validIDs = ["1287", "1308", "1327", "2334"];

    if (!validIDs.includes(stopID.value)) {
        stationName.textContent = "Error";
    }
    let url = baseURL.replace("{stopId}", stopID.value);
    fetch(url)
    .then((response) => response.json())
    .then((result) => showInfo(result));

    function showInfo(data){
        stationName.textContent = data.name;
        for (const b in data.buses) {
            let li = document.createElement("li");
            li.textContent = `Bus ${b} arrives in ${data.buses[b]} minutes`;
            busesEl.appendChild(li);
        }
    }
}