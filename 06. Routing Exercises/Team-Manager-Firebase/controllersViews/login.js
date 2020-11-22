import {login, setUserFieldsInMemmory} from '../dataRequests/dataRequests.js';
import errNotification from './errorNotifications.js';
import goodNotification from './goodNotifications.js';

export default async function() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        loginForm: await this.load('../templates/login/loginForm.hbs')
    }

    this.partial('../templates/login/loginPage.hbs');

}

export async function loginUser(){
    const {username, password} = this.params;
    const result = await login(username, password);

    try{
        if(result.hasOwnProperty('message')){
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        goodNotification('You are logged in!;');
        localStorage.setItem('username', username);
        await setUserFieldsInMemmory(this);
        this.redirect('/home');
    } catch(err) {
        errNotification(err.message);
    }
}