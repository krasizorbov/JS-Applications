export default function(){
    this.app.userInfo.hasTeam = undefined;
    this.app.userInfo.loggedIn = undefined;
    this.app.userInfo.memberTeamId = undefined;
    this.app.userInfo.ownerTeamId = undefined;
    this.app.userInfo.username = undefined;
    localStorage.removeItem('username');
    this.redirect('home');
}