function attachEvents() {
    let refreshBtn = document.getElementById("refresh");
    let sendBtn = document.getElementById("submit");
    let textArea = document.getElementById("messages");
    let url = `https://rest-messanger.firebaseio.com/messanger.json`;

    refreshBtn.addEventListener("click", refreshMessages);
    sendBtn.addEventListener("click", submitMessage);

    function refreshMessages(){
        fetch(url)
        .then(response => response.json())
        .then(result => {
            textArea.value = "";
            textArea.disabled = false;
            let arr = [];
            for (const obj of Object.entries(result)) {
                let text = `${obj[1].author}: ${obj[1].content}`;
                arr.push(text);
            }
            textArea.value += arr.join("\n");
        })
        .catch(() => console.log("Error"));
    }

    function submitMessage() {
        const name = document.getElementById("author").value;
        const message = document.getElementById("content").value;

        const headers = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({author: name, content: message})
        };

        fetch(url, headers)
            .then(() => {
                document.getElementById("author").value = "";
                document.getElementById("content").value = "";
                refreshMessages();
            })
            .catch(() => console.log("Error"));
    }
}

let result = attachEvents();