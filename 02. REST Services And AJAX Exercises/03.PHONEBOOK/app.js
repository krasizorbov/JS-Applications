function attachEvents() {
    let loadBtn = document.getElementById("btnLoad");
    let createBtn = document.getElementById("btnCreate");
    let ul = document.getElementById("phonebook");
    let url = `https://phonebook-nakov.firebaseio.com/phonebook.json`;

    loadBtn.addEventListener("click", loadPhoneBook);
    createBtn.addEventListener("click", createPhoneBook);
    // GET
    function loadPhoneBook(){
        fetch(url)
        .then(response => response.json())
        .then(result => {
        ul.innerHTML = "";
        for (const obj of Object.entries(result)) {
            let li = document.createElement("li");
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.id = obj[0];
            deleteBtn.addEventListener("click", deletePhoneNumber);
            li.textContent = `${obj[1].person} : ${obj[1].phone}`;
            li.appendChild(deleteBtn);
            ul.appendChild(li);
            }
        })
        .catch(() => console.log("Error"));
    }
    // POST
    function createPhoneBook(){
        const person = document.getElementById("person").value;
        const phone = document.getElementById("phone").value;
        const headers = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({person, phone})
        };
        fetch(url, headers)
            .then(() => {
                document.getElementById("person").value = "";
                document.getElementById("phone").value = "";
                ul.innerHTML = "";
                loadPhoneBook();
            })
            .catch(() => console.log("Error"));
    }
    // DELETE
    function deletePhoneNumber(){
        const id = this.id;
        const headers = {method: "DELETE"};
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${id}.json`, headers)
            .then(() => {
                ul.innerHTML = "";
                loadPhoneBook();
            })
            .catch(() => console.log("Error"));
    }
    return {deletePhoneNumber};
}

let result = attachEvents();