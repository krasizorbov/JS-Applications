import {monkeys} from "./monkeys.js";
window.addEventListener("load", async () => {
    const section = document.querySelector("section");

    const sectionString = await (await fetch('./main.hbs')).text();
    const mainTemplate = Handlebars.compile(sectionString);
    Handlebars.registerPartial('monkey', await (await fetch('./monkey.hbs')).text());

    const html = mainTemplate({monkeys});
    section.innerHTML = html;
    
    const monkeysEl = document.querySelector('.monkeys');
    monkeysEl.addEventListener("click", showData);

    function showData(e) {
        if (e.target.tagName !== "BUTTON") {
            return;
        }
        const div = e.target.parentNode.querySelector('p');
        div.removeAttribute('style');
    }
})