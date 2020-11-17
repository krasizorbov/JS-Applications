import { createShoe } from "../data.js";

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
    this.params.name === "" ||
    this.params.price === "" ||
    this.params.image === "" ||
    this.params.brand === ""
  ) {
    return;
  }
  const shoe = {
    name: this.params.name,
    price: this.params.price,
    image: this.params.image,
    brand: this.params.brand,
    content: this.params.content,
    buyers: [],
  };

  try {
    const result = await createShoe(shoe);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.app.userData.isCreator = true;
    localStorage.setItem("shoeId", result.objectId);
    this.app.userData.shoeId = result.objectId;
    this.redirect("index.html");
  } catch (error) {
    alert(error.message);
  }
}
