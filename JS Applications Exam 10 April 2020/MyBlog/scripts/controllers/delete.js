import { deletePost, getPostById } from "../data.js";
export async function del() {
  const result = await getPostById(this.params.id);

  if (result.ownerId === this.app.userData.userId) {
    await deletePost(this.params.id);
  } else {
    alert("You are not the owner of the article");
  }

  this.redirect("index.html");
}
