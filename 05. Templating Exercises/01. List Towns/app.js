window.addEventListener("load", async () => {
    const template = await(await fetch('./main-template.hbs')).text();
    Handlebars.registerPartial('town', await(await fetch('./town-template.hbs')).text());
    
    const templateFunc = Handlebars.compile(template);

    document.querySelector('#btnLoadTowns').addEventListener("click", showInfo);

    const input = document.querySelector('#towns');
    const rootEl = document.querySelector('#root');

    function showInfo(e){
        e.preventDefault();
        const towns = input.value.split(', ');
        const generateHTML = templateFunc({towns});
        rootEl.innerHTML = generateHTML;
    }
});