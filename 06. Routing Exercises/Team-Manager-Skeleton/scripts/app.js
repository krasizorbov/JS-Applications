import home from "./controllers/home.js";
import about from "./controllers/about.js";
import login, { loginForm, logout } from "./controllers/login.js";
import register, { registerForm } from "./controllers/register.js";
import catalog from "./controllers/catalog.js";
import details from "./controllers/details.js";
import create, { createForm } from "./controllers/create.js";
import edit from "./controllers/edit.js";

$(() => {
  const app = Sammy("#main", function () {
    this.use("Handlebars", "hbs");

    this.userData = { loggedIn: false, hasTeam: false };

    this.get("index.html", home);
    this.get("#/home", home);
    this.get("/", home);

    this.get("#/about", about);

    this.get("#/register", register);

    this.get("#/login", login);

    this.get("#/logout", logout);

    this.get("#/catalog", catalog);

    this.get("#/catalog/:id", details);

    this.get("#/create", create);

    this.get("#/edit/:id", edit);

    this.post("#/register", (context) => {
      registerForm.call(context);
    });

    this.post("#/login", (context) => {
      loginForm.call(context);
    });

    this.post("#/create", (context) => {
      createForm.call(context);
    });
  });
  app.run();
});
