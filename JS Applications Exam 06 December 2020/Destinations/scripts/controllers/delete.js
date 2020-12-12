import { deleteDestination } from "../data.js";
export async function del() {
  await deleteDestination(this.params.id);
  this.redirect("#/destinations");
}
