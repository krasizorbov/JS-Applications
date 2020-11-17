import { deleteShoe } from "../data.js";
export async function del() {
  await deleteShoe(this.params.id);
  this.redirect("index.html");
}
