import { getPostById } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    //footer: await this.load("./templates/common/footer.hbs"),
    detailsForm: await this.load("./templates/details/detailsForm.hbs"),
  };

  const data = await getPostById(this.params.id);
  Object.assign(data, this.app.userData);

  this.partial("./templates/details/detailsPage.hbs", data);
}
