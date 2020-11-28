import { edit } from "../data.js";
import { getPostById } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    //footer: await this.load("./templates/common/footer.hbs"),
    editForm: await this.load("./templates/edit/editForm.hbs"),
  };

  const post = await getPostById(this.params.id);
  const data = Object.assign(post, this.app.userData);

  if (post.ownerId !== this.app.userData.userId) {
    alert("You are not the owner of the article");
    return;
  }

  this.partial("./templates/edit/editPage.hbs", data);
}

export async function editPost() {
  const post = {
    title: this.params.title,
    category: this.params.category,
    content: this.params.content,
  };

  const postId = this.params.id;
  if (post.title === "" || post.category === "" || post.content === "") {
    alert("Fields cannot be empty!");
    return;
  }

  try {
    const result = await edit(post, postId);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.redirect(`index.html`);
  } catch (error) {
    alert(error.message);
  }
}
