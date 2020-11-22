import {register, createUserInDb, updateUser} from '../dataRequests/dataRequests.js'
import showError from './errorNotifications.js';
import showRegNotification from './goodNotifications.js';

export default async function() {

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        registerForm: await this.load('../templates/register/registerForm.hbs')
    }

    this.partial('../templates/register/registerPage.hbs');

}

export async function registerUser(){
    const {username, password, repeatPassword} = this.params;
        if(password !== repeatPassword){
            showError('Passwords are different!');
            return;
        }
    try{
        const result = await register(username, password);

        if(result.hasOwnProperty('message')){
            const error = new Error();
            Object.assign(error, result)
            throw error;
        }
        const userId = (await createUserInDb(username)).name;
        updateUser(userId, {id: userId});
        showRegNotification("You have been registered, please login!");
        this.redirect('login');
    } catch(error) {
        showError(error.message);
    }
}