import {updateTeam, getTeam} from "../dataRequests/dataRequests.js";

export default async function() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        editForm: await this.load('../templates/edit/editForm.hbs')
    }

    const curTeam = await getTeam(this.params.id);
    const data = { name: curTeam.name, comment: curTeam.comment};

    Object.assign(data, this.app.userInfo);

    await this.partial('../templates/edit/editPage.hbs', data);

    document.querySelector('input[value="Update Team"]').setAttribute('data-id', this.params.id);
    
    
}

export function editTeam(){
    const teamId = document.querySelector('input[value="Update Team"]').dataset.id;
    
    const {name, comment} = this.params;
    updateTeam(teamId, {
        name,
        comment
    })

    this.redirect('catalog');
}