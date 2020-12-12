import { edit } from "../data.js";
import { getDestinationById } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    editForm: await this.load("./templates/edit/editForm.hbs"),
  };

  const destination = await getDestinationById(this.params.id);
  if (destination.ownerId !== this.app.userData.userId) {
    alert("You have no rights to edit this destination!");
    return;
  }
  const data = Object.assign(destination, this.app.userData);
  this.partial("./templates/edit/editPage.hbs", data);
}

export async function editDestination() {
  const dest = {
    destination: this.params.destination,
    city: this.params.city,
    image: this.params.imgUrl,
    duration: Number(this.params.duration),
    departureDate: this.params.departureDate,
  };

  const destinationId = this.params.id;
  if (
    this.params.destination === "" ||
    this.params.city === "" ||
    this.params.duration === "" ||
    this.params.departureDate === "" ||
    this.params.imgUrl === ""
  ) {
    alert("Fields cannot be empty!");
    return;
  }

  try {
    const result = await edit(dest, destinationId);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.redirect(`#/details/${this.params.id}`);
  } catch (error) {
    alert(error.message);
  }
}
