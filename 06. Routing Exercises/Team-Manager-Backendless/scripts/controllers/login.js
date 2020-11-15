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
  try {
    const result = await login(this.params.username, this.params.password);
    if (result.hasOwnProperty("errorData")) {
      alert(result.message);
      return;
    }
    this.app.userData.loggedIn = true;
    this.app.userData.username = result.username;
    this.app.userData.userId = result.objectId;
    if (result.hasTeam === true) {
      this.app.userData.hasTeam = true;
      this.app.userData.isOnTeam = true;
    }
    console.log(this.app.userData);
    localStorage.setItem("userToken", result["user-token"]);
    localStorage.setItem("username", result.username);
    localStorage.setItem("userId", result.objectId);
    console.log(localStorage.getItem("userToken"));
    this.redirect("#/home");
  } catch (error) {
    alert(error.message);
  }
}
export async function logout() {
  await logoutGet();
  this.app.userData.loggedIn = false;
  this.app.userData.username = undefined;
  this.app.userData.userId = undefined;
  this.app.userData.hasTeam = false;
  this.app.userData.isAuthor = false;
  this.app.userData.isOnTeam = false;
  localStorage.removeItem("userToken");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
  this.redirect("#/home");
}
