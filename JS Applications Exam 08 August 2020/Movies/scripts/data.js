const apiID = "A2B80C1D-EF7D-9932-FF46-059793508A00";
const apiKEY = "6CA1313E-5803-4ECC-8926-30CE898514BF";
const registerURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/register`;
const loginURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/login`;
const logoutURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/logout`;
const shoesURL = `https://api.backendless.com/${apiID}/${apiKEY}/data/shoes`;
const deleteURL = `https://api.backendless.com/${apiID}/${apiKEY}/data/shoes/`;
const editShoesURL = `https://api.backendless.com/${apiID}/${apiKEY}/data/shoes/`;

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
