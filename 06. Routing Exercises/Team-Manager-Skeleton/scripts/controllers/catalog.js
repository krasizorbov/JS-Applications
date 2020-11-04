export default async function (){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        team: await this.load('./templates/catalog/team.hbs')
       };

       const data = Object.assign({}, this.app.userData);
       data.teams = [
           {teamId: 123, name: "Cherry", comment: "Get lost"},
           {teamId: 124, name: "Apple", comment: "I will find you"},
           {teamId: 125, name: "Banana", comment: "Nevermind"},
       ]

       this.partial('./templates/catalog/teamCatalog.hbs', data); 
       
       
}