import { createPost } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    //footer: await this.load("./templates/common/footer.hbs"),
    createForm: await this.load("./templates/create/createForm.hbs"),
  };
  this.partial("./templates/create/createPage.hbs", this.app.userData);
}

export async function createForm() {
  if (
    this.params.title === "" ||
    this.params.category === "" ||
    this.params.content === ""
  ) {
    return;
  }
  const post = {
    title: this.params.title,
    category: this.params.category,
    content: this.params.content,
  };

  try {
    const result = await createPost(post);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.app.userData.isCreator = true;
    localStorage.setItem("postId", result.objectId);
    this.app.userData.postId = result.objectId;
    this.redirect("index.html");
  } catch (error) {
    alert(error.message);
  }
}
