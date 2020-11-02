window.addEventListener("load", async () => {
    const template = await(await fetch('./main-template.hbs')).text();

    // Partial Name = town; Calling partial is done by {{> town}} in main-template.hbs
    Handlebars.registerPartial('town', await(await fetch('./town-template.hbs')).text());

    const templateFunc = Handlebars.compile(template);

    document.querySelector('#btnLoadTowns').addEventListener("click", showInfo);

    function showInfo(e){
        e.preventDefault();
        const towns = document.querySelector('#towns').value.split(', ');
        document.querySelector('#root').innerHTML = templateFunc({towns});
    }
});