import { edit } from "../data.js";
import { getShoeById } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    editForm: await this.load("./templates/edit/editForm.hbs"),
  };
  const form = await fetch("./templates/edit/editForm.hbs");
  const shoe = await getShoeById(this.params.id);
  const data = Object.assign(shoe, this.app.userData);
  this.partial("./templates/edit/editPage.hbs", data);
}

export async function editShoe() {
  const shoe = {
    name: this.params.name,
    price: this.params.price,
    image: this.params.image,
    comment: this.params.comment,
    brand: this.params.brand,
  };
  const shoeId = this.params.id;
  if (
    shoe.name === "" ||
    shoe.price === "" ||
    shoe.image === "" ||
    shoe.comment === "" ||
    shoe.brand === ""
  ) {
    alert("Fields cannot be empty!");
    return;
  }

  try {
    const result = await edit(shoe, shoeId);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.redirect(`index.html`);
  } catch (error) {
    alert(error.message);
  }
}
