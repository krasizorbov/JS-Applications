import { getDestinations } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    destination: await this.load("./templates/catalog/destination.hbs"),
  };
  const destinations = await getDestinations();
  const data = Object.assign({ destinations }, this.app.userData);
  this.partial("./templates/home/home.hbs", data);
}
