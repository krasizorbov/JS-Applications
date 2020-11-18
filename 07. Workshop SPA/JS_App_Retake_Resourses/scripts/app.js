import home from "./controllers/home.js";
import login, { loginForm, logout } from "./controllers/login.js";
import register, { registerForm } from "./controllers/register.js";
import details from "./controllers/details.js";
import create, { createForm } from "./controllers/create.js";
import { del } from "./controllers/delete.js";
import edit, { editShoe } from "./controllers/edit.js";
import { buyShoe } from "./controllers/buy.js";

$(() => {
  const app = Sammy("#main", function () {
    this.use("Handlebars", "hbs");

    this.userData = { loggedIn: false };

    this.get("index.html", home);

    this.get("#/register", register);

    this.get("#/login", login);

    this.get("#/logout", logout);

    this.get("#/create", create);

    this.get("#/details/:id", details);

    this.get("#/edit/:id", edit);

    this.get("#/buy/:id", buyShoe);

    this.post("#/register", (context) => {
      registerForm.call(context);
    });

    this.post("#/login", (context) => {
      loginForm.call(context);
    });

    this.post("#/create", (context) => {
      createForm.call(context);
    });

    this.get("#/delete/:id", (context) => {
      del.call(context);
    });

    this.post("#/edit/:id", (context) => {
      editShoe.call(context);
    });
  });
  app.run();
});
