import { register } from "../data.js";
export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    registerForm: await this.load("./templates/register/registerForm.hbs"),
  };
  this.partial("./templates/register/registerPage.hbs");
}

export async function registerForm() {
  if (
    this.params.email === "" ||
    this.params.password === "" ||
    this.params.repeatPassword === ""
  ) {
    return;
  }
  if (this.params.password !== this.params.repeatPassword) {
    alert("Passwords don't match!");
    return;
  }
  if (this.params.password.length < 6) {
    alert("Password length must be at least 6 characters long!");
    return;
  }

  try {
    const result = await register(this.params.email, this.params.password);

    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.redirect("index.html");
  } catch (error) {
    alert(error.message);
  }
}
