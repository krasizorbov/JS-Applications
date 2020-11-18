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
    this.redirect(`#/details/${shoe.objectId}`);
  } catch (error) {
    alert(error.message);
  }
}
