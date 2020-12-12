import { createDestination } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    createForm: await this.load("./templates/create/createForm.hbs"),
  };
  this.partial("./templates/create/createPage.hbs", this.app.userData);
}

export async function createForm() {
  if (
    this.params.destination === "" ||
    this.params.city === "" ||
    this.params.duration === "" ||
    this.params.departureDate === "" ||
    this.params.imgUrl === ""
  ) {
    return;
  }

  // if (Number(this.params.duration) < 1 || Number(this.params.duration) > 100) {
  //   alert("Duration must be between 1 and 100");
  //   return;
  // }
  const dest = {
    destination: this.params.destination,
    city: this.params.city,
    image: this.params.imgUrl,
    duration: Number(this.params.duration),
    departureDate: this.params.departureDate,
  };

  try {
    const result = await createDestination(dest);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.app.userData.isCreator = true;
    localStorage.setItem("destinationId", result.objectId);
    this.app.userData.destinationId = result.objectId;
    this.redirect("index.html");
  } catch (error) {
    alert(error.message);
  }
}
