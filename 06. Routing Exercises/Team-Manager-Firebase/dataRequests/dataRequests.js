import errMessage from '../controllersViews/errorNotifications.js';

const baseUrl = 'https://softuni-afab5.firebaseio.com/';

export function register(username, password){
    return firebase.auth().createUserWithEmailAndPassword(username, password).catch(err => err);
    
}

export function login(username, password){
    return firebase.auth().signInWithEmailAndPassword(username, password).catch(err => err);
}

export function createTeamRequest(team){
    const url = 'https://softuni-afab5.firebaseio.com/teams/.json'
    return fetch(baseUrl + 'teams/.json', {
        method: 'POST',
        body: JSON.stringify(team)
    }).then(result => result.json())
    .catch(err => err);
}

export function getTeams(){
    return fetch(baseUrl + 'teams/.json')
    .then(result => result.json());
}

export async function addTeamId(id){
    await fetch(baseUrl + `teams/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify({
            teamId: id
        })
    })
}

export async function getTeam(id){
    return (await fetch(baseUrl + `/teams/${id}.json`)).json();
}

export async function isItLogIn(contex){
    const isLogged = localStorage.getItem('username');
    if(!isLogged){
        errMessage('You are not logged!');        
        return false;
    } else {
        await setUserFieldsInMemmory(contex);
        return true;
    }
}

export async function createUserInDb(username){
    return (await fetch(baseUrl + 'users/.json', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            ownerTeamId: '',
            memberTeamId: '',
            hasTeam: false
        })
    })).json();
}

export function updateUser(userId, objToAdd){
    fetch(baseUrl + 'users/' + userId + '.json', {
        method: 'PATCH',
        body: JSON.stringify(objToAdd)
    });
}

export function updateTeam(teamId, objToAdd){
    fetch(baseUrl + 'teams/' + teamId + '.json', {
        method: 'PATCH',
        body: JSON.stringify(objToAdd)
    });
}

export async function getUserFromMail(mail){
    let allUsers = await (await fetch(baseUrl + 'users/.json')).json();
    const user = Object.values(allUsers).find(u => u.username === mail);
    return user;
}

export async function setUserFieldsInMemmory(context){

    const username = localStorage.getItem('username');
    const curUser = await getUserFromMail(username);
    context.app.userInfo.loggedIn = true;
    context.app.userInfo.username = username;
    context.app.userInfo.id = curUser.id;
    context.app.userInfo.memberTeamId = curUser.memberTeamId;
    context.app.userInfo.ownerTeamId = curUser.ownerTeamId;
    context.app.userInfo.hasTeam = curUser.ownerTeamId.length > 0 ? true : false;
    
    
}