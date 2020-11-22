import {getTeam} from '../dataRequests/dataRequests.js';

export default async function() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        teamMember: await this.load('../templates/catalog/teamMember.hbs'),
        teamControls: await this.load('../templates/catalog/teamControls.hbs'),
    }

    const curTeam = await getTeam(this.params.id)
    const isAuthor = curTeam.owner === this.app.userInfo.username ? true : false;
    let isOnTeam = '';
    if(Array.isArray(curTeam.members)){
        isOnTeam = curTeam.members.find(m => m.username === this.app.userInfo.username) ? true : false;
    } else {
        isOnTeam = false;
    }
    
    

    const data =  {
        teamId: curTeam.teamId,
        name: curTeam.name,
        comment: curTeam.comment,
        members: curTeam.members,
        isAuthor: isAuthor,
        isOnTeam: isOnTeam
    }

    Object.assign(data, this.app.userInfo);

    this.partial('../templates/catalog/details.hbs', data); 
}