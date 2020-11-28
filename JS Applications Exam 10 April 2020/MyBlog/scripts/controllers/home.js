import { getPosts } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    createForm: await this.load("./templates/create/createForm.hbs"),
    post: await this.load("./templates/catalog/post.hbs"),
  };
  const posts = await getPosts();
  const data = Object.assign({ posts }, this.app.userData);
  this.partial("./templates/home/home.hbs", data);
}
