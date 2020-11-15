import { edit } from "../data.js";
import { leave } from "../data.js";
import { join } from "../data.js";
import { getTeamById } from "../data.js";
import { updateUserDoesNotHaveTeamBoolean } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    editForm: await this.load("./templates/edit/editForm.hbs"),
  };
  this.partial("./templates/edit/editPage.hbs", this.app.data);
}

export async function editTeam() {
  const team = { name: this.params.name, comment: this.params.comment };
  if (team.name === "" || team.comment === "") {
    alert("Fields cannot be empty!");
    return;
  }

  try {
    const result = await edit(team);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.redirect(`#/catalog/${this.params.id}`);
  } catch (error) {
    alert(error.message);
  }
}

export async function leaveTeam() {
  const teamId = localStorage.getItem("teamId");
  try {
    const result = await leave(teamId);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    const userId = localStorage.getItem("userId");
    await updateUserDoesNotHaveTeamBoolean(userId);
    this.app.userData.isOnTeam = false;
    this.redirect(`#/home`);
  } catch (error) {
    alert(error.message);
  }
}

export async function joinTeam() {
  const team = await getTeamById(this.params.id);
  try {
    const result = await join(team);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.app.userData.isOnTeam = true;
    this.redirect(`#/home`);
  } catch (error) {
    alert(error.message);
  }
}
