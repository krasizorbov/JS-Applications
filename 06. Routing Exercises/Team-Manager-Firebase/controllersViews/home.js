import {isItLogIn} from '../dataRequests/dataRequests.js'

export default async function() {

    await isItLogIn(this);

    const data = {};

    if(this.app.userInfo.ownerTeamId){
        data['teamId'] = this.app.userInfo.ownerTeamId;
    }

    Object.assign(data, this.app.userInfo);

    console.log(data);
    console.log(this.app.userInfo);

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }

    this.partial('../templates/home/home.hbs', data);
}