import { getShoeById } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    detailsForm: await this.load("./templates/details/detailsForm.hbs"),
  };

  const data = await getShoeById(this.params.id);
  Object.assign(data, this.app.userData);
  data.count = data.buyers.length;

  if (data.ownerId === localStorage.getItem("userId")) {
    data.isCreator = true;
  } else {
    data.isCreator = false;
  }
  this.partial("./templates/details/detailsPage.hbs", data);
}
