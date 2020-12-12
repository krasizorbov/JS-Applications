import { getDestinations } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    destinationsForm: await this.load(
      "./templates/destinations/destinationsForm.hbs"
    ),
    dest: await this.load("./templates/catalog/dest.hbs"),
  };
  const destinations = await getDestinations();

  for (let i = 0; i < destinations.length; i++) {
    if (destinations.length === 0) {
      return;
    } else {
      if (destinations[i].ownerId !== this.app.userData.userId) {
        destinations.splice(i, 1);
        i--;
      }
    }
  }

  const data = Object.assign({ destinations }, this.app.userData);
  this.partial("./templates/destinations/destinationsPage.hbs", data);
}
