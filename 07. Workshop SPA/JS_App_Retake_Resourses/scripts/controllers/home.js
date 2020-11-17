import { getShoes } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    shoe: await this.load("./templates/catalog/shoe.hbs"),
  };
  const shoes = await getShoes();
  const data = Object.assign({ shoes }, this.app.userData);
  this.partial("./templates/home/home.hbs", data);
}
