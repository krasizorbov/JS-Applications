import home from "./controllers/home.js";
import login, { loginForm, logout } from "./controllers/login.js";
import register, { registerForm } from "./controllers/register.js";
import details from "./controllers/details.js";
import create, { createForm } from "./controllers/create.js";
import { del } from "./controllers/delete.js";
import edit, { editDestination } from "./controllers/edit.js";
import getDestinationsByUser from "./controllers/destinations.js";

$(() => {
  const app = Sammy("#container", function () {
    this.use("Handlebars", "hbs");

    this.userData = { loggedIn: false };

    this.get("index.html", home);
    this.get("#/home", home);
    this.get("/", home);

    this.get("#/register", register);

    this.get("#/login", login);

    this.get("#/logout", logout);

    this.get("#/create", create);

    this.get("#/details/:id", details);

    this.get("#/edit/:id", edit);

    this.get("#/destinations", getDestinationsByUser);

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
      editDestination.call(context);
    });
  });
  app.run();
});
