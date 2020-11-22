import {updateUser, updateTeam, getTeam, isItLogIn} from '../dataRequests/dataRequests.js';

export default async function(){

    if(!await isItLogIn(this)){
        this.redirect('/home');
        return;
    }

    const curTeam = await getTeam(this.app.userInfo.memberTeamId);

    let curMembers = '';
    if(Array.isArray(curTeam.members)){
        curMembers = curTeam.members.filter(u => u.username !== this.app.userInfo.username);
    }
    
    curMembers = curMembers.length === 0 ? '' : curMembers;

    updateTeam(this.app.userInfo.memberTeamId, {
        members: curMembers
    });

    updateUser(this.app.userInfo.id, {
        memberTeamId: ''
    });

    this.redirect('catalog');
}