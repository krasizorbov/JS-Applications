function getInfo() {
    let stopID = document.querySelector("#stopId").value;
    let stationName = document.querySelector("#stopName");
    let busesEl = document.querySelector("#buses");
    let url = `https://judgetests.firebaseio.com/businfo/${stopID}.json`;
    let validIDs = ['1287', '1308', '1327', '2334'];

    if (validIDs.includes(stopID)) {
        stationName.textContent = "";
        clearList(busesEl);
        fetch(url)
        .then((response) => response.json())
        .then((result) => showInfo(result));
        
    } else{
        clearList(busesEl);
        stationName.textContent = "Error";
    }

    function clearList(ul) {
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
      }

    function showInfo(data){
        stationName.textContent = data.name;
        for (const b in data.buses) {
            let li = document.createElement("li");
            li.textContent = `Bus ${b} arrives in ${data.buses[b]} minutes`;
            busesEl.appendChild(li);
        }
    }
}