import { createTeam } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    createForm: await this.load("./templates/create/createForm.hbs"),
  };
  this.partial("./templates/create/createPage.hbs", this.app.data);
}

export async function createForm() {
  const team = { name: this.params.name, comment: this.params.comment };
  if (team.name === "" || team.comment === "") {
    alert("Fields cannot be empty!");
    return;
  }

  try {
    const result = await createTeam(team);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.app.userData.hasTeam = true;
    this.app.userData.teamId = result.objectId;
    this.redirect(`#/catalog/${result.objectId}`);
  } catch (error) {
    alert(error.message);
  }
}
