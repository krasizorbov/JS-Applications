const apiID = "4507E4D5-EFF0-38BB-FF10-FD704C0D0100";
const apiKEY = "072F46DD-3721-4101-9AF2-F3C1DF4CABB5";
const registerURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/register`;
const loginURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/login`;
const logoutURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/logout`;
const shoesURL = `https://api.backendless.com/${apiID}/${apiKEY}/data/shoes`;

export async function register(email, password) {
  const response = await fetch(registerURL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
}

export async function logoutGet() {
  const token = localStorage.getItem("userToken");
  if (!token) {
    alert("User is not logged in!");
  }
  return fetch(logoutURL, {
    method: "GET",
    headers: { "user-token": token },
  });
}

export async function login(email, password) {
  const response = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ login: email, password }),
  });
  const data = await response.json();
  return data;
}

export async function createShoe(team) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(shoesURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "user-token": localStorage.getItem("userToken"),
    },
    body: JSON.stringify(team),
  });
  const data = await response.json();
  if (data.hasOwnProperty("errorData")) {
    alert(data.message);
    return;
  }
  return data;
}

export async function getShoes() {
  return (await fetch(shoesURL)).json();
}

export async function getShoeById(id) {
  return (await fetch(shoesURL + "/" + id)).json();
}
