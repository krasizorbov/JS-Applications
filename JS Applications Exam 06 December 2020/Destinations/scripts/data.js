const apiID = "172A1FC9-E027-4242-FFC5-8D7537D9CC00";
const apiKEY = "B68BC796-3C9B-43C0-9A4E-2148A0B643F3";
const registerURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/register`;
const loginURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/login`;
const logoutURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/logout`;
const destinationsURL = `https://api.backendless.com/${apiID}/${apiKEY}/data/destinations`;
const deleteURL = `https://api.backendless.com/${apiID}/${apiKEY}/data/destinations/`;
const editDestinationsURL = `https://api.backendless.com/${apiID}/${apiKEY}/data/destinations/`;

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

export async function createDestination(destination) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(destinationsURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "user-token": localStorage.getItem("userToken"),
    },
    body: JSON.stringify(destination),
  });
  const data = await response.json();
  if (data.hasOwnProperty("errorData")) {
    alert(data.message);
    return;
  }
  return data;
}

export async function getDestinations() {
  return (await fetch(destinationsURL)).json();
}

export async function getDestinationById(id) {
  return (await fetch(destinationsURL + "/" + id)).json();
}

export async function deleteDestination(id) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(deleteURL + id, { method: "DELETE" });
  const data = await response.json();
  return data;
}

export async function edit(destination, id) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(editDestinationsURL + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "user-token": localStorage.getItem("userToken"),
    },
    body: JSON.stringify(destination),
  });
  const data = await response.json();
  if (data.hasOwnProperty("errorData")) {
    alert(data.message);
    return;
  }
  return data;
}
