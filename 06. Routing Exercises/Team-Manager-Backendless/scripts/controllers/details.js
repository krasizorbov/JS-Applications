import { getTeamById } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    teamMember: await this.load("./templates/catalog/teamMember.hbs"),
    teamControls: await this.load("./templates/catalog/teamControls.hbs"),
  };

  const data = await getTeamById(this.params.id);
  Object.assign({ data }, this.app.userData);
  let username = {};
  if (data.members !== undefined) {
    username = data.members.find(
      (m) => m.username === localStorage.getItem("username")
    );
    if (username !== undefined) {
      data.isOnTeam = true;
    } else {
      data.isOnTeam = false;
    }
  }

  if (data.ownerId === this.app.userData.userId) {
    data.isAuthor = true;
  }

  this.partial("./templates/catalog/details.hbs", data);
}
