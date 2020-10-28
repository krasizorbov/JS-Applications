function solve() {
    let info = document.getElementsByClassName("info")[0];
    let departBtn = document.getElementById("depart");
    let arriveBtn = document.getElementById("arrive");
    let currentId = "depot";

    function depart() {
        let url = `https://judgetests.firebaseio.com/schedule/${currentId}.json `;

        fetch(url)
        .then((resource) => resource.json())
        .then((result) => {info.textContent = `Next stop ${result.name}`})
        .catch(Error());

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        let url = `https://judgetests.firebaseio.com/schedule/${currentId}.json `;
        
        fetch(url)
        .then((resource) => resource.json())
        .then((result) => {info.textContent = `Arriving at ${result.name}`
        currentId = result.next})
        .catch(Error());

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };

    function Error() {
        return () => {
            info.textContent = "Error";
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        };
    }
}
let result = solve();