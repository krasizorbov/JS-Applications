import {updateUser, updateTeam, getTeam} from "../dataRequests/dataRequests.js"

export default async function(){
    const teamId = this.params.id;
    const userId = this.app.userInfo.id;

    const curTeam = await getTeam(teamId);

    if(Array.isArray(curTeam.members)){
        curTeam.members.push({username: this.app.userInfo.username});
    } else {
        curTeam.members = [{username: this.app.userInfo.username}];
    }

    updateUser(userId, {
        memberTeamId: teamId
    });

    updateTeam(teamId, {
        members: curTeam.members
    })

    this.redirect('catalog');
}