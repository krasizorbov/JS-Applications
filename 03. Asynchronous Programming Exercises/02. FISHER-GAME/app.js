import {data} from './data.js';
function attachEvents(){
    const anglerE = document.querySelector("#addForm .angler");
    const weightE = document.querySelector('#addForm .weight');
    const speciesE = document.querySelector('#addForm .species');
    const locationE = document.querySelector('#addForm .location');
    const baitE = document.querySelector('#addForm .bait');
    const captureTimeE = document.querySelector('#addForm .captureTime');
    let catchesCollection = document.getElementById("catches");
    const loadBtn = document.getElementsByClassName("load")[0];
    const addBtn = document.getElementsByClassName('add')[0];

    addBtn.addEventListener("click", addData);
    loadBtn.addEventListener("click", loadData);

    function loadData() {
        clearElements();
        data().loadData()
            .then(data => {
                Object.entries(data)
                    .forEach(([id, item]) => {
                        const catchesDiv = ce("div", "", "catch", "", ["data-id", id]);
    
                        const anglerLabel = ce("label", "Angler");
                        const anglerInput = ce("input", "", "angler", "", ["type", "text"], ["value", item.angler]);

                        const weightLabel = ce("label", "Weight");
                        const weightInput = ce("input", "", "weight", "", ["type", "number"], ["value", item.weight]);

                        const speciesLabel = ce("label", "Species");
                        const speciesInput = ce("input", "", "species", "", ["type", "text"], ["value", item.species]);

                        const locationLabel = ce("label", "Location");
                        const locationInput = ce("input", "", "location", "", ["type", "text"], ["value", item.location]);
    
                        const baitLabel = ce("label", "Bait");
                        const baitInput = ce("input", "", "bait", "", ["type", "text"], ["value", item.bait]);
    
                        const captureTimeLabel = ce("label", "Capture Time");
                        const captureTimeInput = ce("input", "", "captureTime", "", ["type", "number"], ["value", item.captureTime]);
    
                        const updateButton = ce("button", "Update", "update");
                        updateButton.addEventListener("click", updateCatch);
    
                        const deleteButton = ce("button", "Delete", "delete");
                        deleteButton.addEventListener("click", deleteCatch);
    
                        catchesDiv.append(anglerLabel, anglerInput);
                        catchesDiv.appendChild(document.createElement("hr"));
                        catchesDiv.append(weightLabel, weightInput);
                        catchesDiv.appendChild(document.createElement("hr"));
                        catchesDiv.append(speciesLabel, speciesInput);
                        catchesDiv.appendChild(document.createElement("hr"));
                        catchesDiv.append(locationLabel, locationInput);
                        catchesDiv.appendChild(document.createElement("hr"));
                        catchesDiv.append(baitLabel, baitInput);
                        catchesDiv.appendChild(document.createElement("hr"));
                        catchesDiv.append(captureTimeLabel, captureTimeInput);
                        catchesDiv.appendChild(document.createElement("hr"));
                        catchesDiv.append(updateButton, deleteButton);
                        catchesCollection.appendChild(catchesDiv);
                    })
            })
            .catch(() => console.log("Error"));
    }

    function clearElements(){
        let arr = Array.from(catchesCollection.children);
        if (arr.length > 1) {
            for(let i = 1; i < arr.length; i++){
                arr[i].remove();
            }
        }
    }

    function deleteCatch(){
        const id = this.parentNode.getAttribute("data-id");
        this.parentNode.parentNode.removeChild(this.parentNode);
        const headers = {method: "DELETE"};

        data().deleteCatch(id, headers)
            .then(() => {loadData();})
            .catch((error) => console.log(error.message));
    }

    function updateCatch(){
        const id = this.parentNode.getAttribute("data-id");
        const headers = {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            "angler": this.parentNode.querySelector(".angler").value,
            "weight": this.parentNode.querySelector(".weight").value,
            "species": this.parentNode.querySelector(".species").value,
            "location": this.parentNode.querySelector(".location").value,
            "bait": this.parentNode.querySelector(".bait").value,
            "captureTime": this.parentNode.querySelector(".captureTime").value
        })
    };

    data().updateCatch(id, headers)
        .then(() => {loadData();})
        .catch(() => console.log("Error"));
    }

    function addData() {
        const headers = {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "angler": anglerE.value,
                "weight": weightE.value,
                "species": speciesE.value,
                "location": locationE.value,
                "bait": baitE.value,
                "captureTime": captureTimeE.value
            })
        };
        data().addCatch(headers)
        .then(() => {loadData();})
        .catch(() => console.log("Error"));
    }

    function ce(el, text, className, id, attType, attValue) {
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
        if (attType) {
            e.setAttribute(attType[0], attType[1]);
        }
        if (attValue) {
            e.setAttribute(attValue[0], attValue[1]);
        }
        return e;
      }
}
attachEvents();