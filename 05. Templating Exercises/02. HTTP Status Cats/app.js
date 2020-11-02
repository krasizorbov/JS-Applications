window.addEventListener("load", async () => {
    const el = document.querySelector('#allCats');
    const catString = await (await fetch('./cat.hbs')).text();
    const catTemplate = Handlebars.compile(catString);

    const html = catTemplate({cats});
    el.innerHTML = html;

    el.addEventListener("click", showInfo);

    function showInfo(e) {
        if (e.target.tagName !== "BUTTON") {
            return;
        }
        const div = e.target.parentNode.querySelector('.status');
        if (e.target.innerText === "Show status code") {
            e.target.innerText = "Hide status code";
            div.style.display = "block";
        } else {
            e.target.innerText = "Show status code";
            div.style.display = "none";
        }
    }
})
