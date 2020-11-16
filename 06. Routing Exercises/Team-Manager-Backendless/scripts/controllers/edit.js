import { edit } from "../data.js";
import { leave } from "../data.js";
import { join } from "../data.js";
import { getTeamById } from "../data.js";
import { updateUserDoesNotHaveTeamBoolean } from "../data.js";
import { updateUserHasTeamBoolean } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    editForm: await this.load("./templates/edit/editForm.hbs"),
  };
  const team = await getTeamById(this.params.id);
  const data = Object.assign(team, this.app.userData);
  this.partial("./templates/edit/editPage.hbs", data);
}

export async function editTeam() {
  const team = { name: this.params.name, comment: this.params.comment };
  const teamId = this.params.id;
  console.log(team);
  if (team.name === "" || team.comment === "") {
    alert("Fields cannot be empty!");
    return;
  }

  try {
    const result = await edit(team, teamId);
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
  const username = localStorage.getItem("username");
  const team = await getTeamById(this.params.id);
  const nameToRemove = team.members.find((m) => m.username === username);
  const index = team.members.indexOf(nameToRemove);
  team.members.splice(index, 1);
  try {
    const result = await leave(team, this.params.id);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    const userId = localStorage.getItem("userId");
    await updateUserDoesNotHaveTeamBoolean(userId);
    this.app.userData.isOnTeam = false;
    this.app.userData.hasTeam = false;
    localStorage.setItem("hasTeam", false);
    localStorage.setItem("isOnTeam", false);
    this.redirect(`#/catalog`);
  } catch (error) {
    alert(error.message);
  }
}

export async function joinTeam() {
  if (localStorage.getItem("isOnTeam") === "true") {
    alert(
      "You are already a member of a team!\nPlease leave your current team first!"
    );
    this.redirect(`#/catalog`);
    return;
  }
  const team = await getTeamById(this.params.id);
  const username = localStorage.getItem("username");
  team.members.push({ username: username });
  try {
    const result = await join(team, this.params.id);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    const userId = localStorage.getItem("userId");
    await updateUserHasTeamBoolean(userId);
    this.app.userData.hasTeam = true;
    this.app.userData.isOnTeam === true;
    localStorage.setItem("hasTeam", true);
    localStorage.setItem("isOnTeam", true);
    this.redirect(`#/catalog/${this.params.id}`);
  } catch (error) {
    alert(error.message);
  }
}
