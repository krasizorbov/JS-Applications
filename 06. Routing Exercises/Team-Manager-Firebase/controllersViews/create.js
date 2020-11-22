import errMessage from '../controllersViews/errorNotifications.js';
import {createTeamRequest, addTeamId, getTeams, isItLogIn, updateUser} from '../dataRequests/dataRequests.js'

export default async function() {

    if(!await isItLogIn(this)){
        this.redirect('/home');
        return;
    }

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        createForm: await this.load('../templates/create/createForm.hbs')
    }

    this.partial('../templates/create/createPage.hbs', this.app.userInfo); 
}

export async function createTeam(){

    if(!await isItLogIn(this)){
        this.redirect('/home');
        return;
    }
    
    const {name, comment} = this.params;

    const allTeams = await getTeams();

    const isTeamExist = !allTeams ? undefined : Object.values(allTeams).find(t => t.name === name);

    if(isTeamExist){
        errMessage('Team name already exist!');
        return;
    }

    const members = [{username: this.app.userInfo.username}];
    const owner = this.app.userInfo.username;
    const team = {
        name,
        comment,
        members,
        owner
    }

    const createdTeam = await createTeamRequest(team);

    try{
        if(createdTeam.hasOwnProperty('message')){
            const error = new Error();
            Object.assign(error, createdTeam);
            throw error;
        }
        const teamId = createdTeam.name;
        addTeamId(teamId);
        this.redirect(`catalog/${teamId}`);
        this.app.userInfo.hasTeam = true;
        this.app.userInfo.ownerTeamId = teamId;
        this.app.userInfo.memberTeamId = teamId;

        updateUser(this.app.userInfo.id, {
            hasTeam: this.app.userInfo.hasTeam,
            ownerTeamId: this.app.userInfo.ownerTeamId,
            memberTeamId: this.app.userInfo.memberTeamId
        });

    } catch(err) {
        errMessage(err.message);
    }

   

}