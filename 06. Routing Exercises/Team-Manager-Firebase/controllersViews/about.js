import {isItLogIn} from '../dataRequests/dataRequests.js'

export default async function() {

    await isItLogIn(this);

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }

    console.log(this.app.userInfo);

    this.partial('../templates/about/about.hbs', this.app.userInfo);
}