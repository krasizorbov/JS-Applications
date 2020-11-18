import { buy } from "../data.js";
import { getShoeById } from "../data.js";

export async function buyShoe() {
  const shoe = await getShoeById(this.params.id);
  shoe.buyers.push(localStorage.getItem("userId"));
  try {
    const result = await buy(shoe, this.params.id);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.app.userData.articles.push(this.params.id);
    if (this.app.userData.articles.includes(this.params.id)) {
      this.app.userData.bought = false;
    } else {
      this.app.userData.bought = true;
    }
    this.redirect(`#/details/${shoe.objectId}`);
  } catch (error) {
    alert(error.message);
  }
}
