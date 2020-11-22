import {getTeams, isItLogIn} from '../dataRequests/dataRequests.js'

export default async function() {
    if(!await isItLogIn(this)) {
        this.redirect('home');
        return;
    }

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        team: await this.load('../templates/catalog/team.hbs'),
    }

    
    let allTeams = await getTeams();
    const curTeams = !allTeams ? [] : Object.values(allTeams);
    
    const data = {
        teams: curTeams
    };

    Object.assign(data, this.app.userInfo);

    console.log(data);
    console.log(this.app.userInfo);

    this.partial('../templates/catalog/teamCatalog.hbs', data);
}