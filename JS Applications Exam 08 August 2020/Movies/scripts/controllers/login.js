import { login, logoutGet } from "../data.js";

export default async function () {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
    loginForm: await this.load("./templates/login/loginForm.hbs"),
  };
  this.partial("./templates/login/loginPage.hbs");
}

export async function loginForm() {
  if (this.params.email === "" || this.params.password === "") {
    return;
  }
  try {
    const result = await login(this.params.email, this.params.password);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.app.userData.loggedIn = true;
    this.app.userData.email = result.email;
    this.app.userData.userId = result.objectId;

    localStorage.setItem("userToken", result["user-token"]);
    localStorage.setItem("email", result.email);
    localStorage.setItem("userId", result.objectId);

    this.redirect("#/Home");
  } catch (error) {
    alert(error.message);
  }
}
export async function logout() {
  await logoutGet();
  this.app.userData.loggedIn = false;
  this.app.userData.email = undefined;
  this.app.userData.userId = undefined;

  localStorage.removeItem("userToken");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
  this.redirect("#/Home");
}
