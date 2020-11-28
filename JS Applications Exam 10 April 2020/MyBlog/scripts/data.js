const apiID = "ABC6AC8A-C7D5-A87C-FF74-94D346017700";
const apiKEY = "1CD3E978-382D-4813-9B7D-B971880E6E4E";
const registerURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/register`;
const loginURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/login`;
const logoutURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/logout`;
const postsURL = `https://api.backendless.com/${apiID}/${apiKEY}/data/posts`;
const deleteURL = `https://api.backendless.com/${apiID}/${apiKEY}/data/posts/`;
const editPostURL = `https://api.backendless.com/${apiID}/${apiKEY}/data/posts/`;

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

export async function createPost(post) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(postsURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "user-token": localStorage.getItem("userToken"),
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  if (data.hasOwnProperty("errorData")) {
    alert(data.message);
    return;
  }
  return data;
}

export async function getPosts() {
  return (await fetch(postsURL)).json();
}

export async function getPostById(id) {
  return (await fetch(postsURL + "/" + id)).json();
}

export async function deletePost(id) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(deleteURL + id, { method: "DELETE" });
  const data = await response.json();
  return data;
}

export async function edit(post, id) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(editPostURL + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "user-token": localStorage.getItem("userToken"),
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  if (data.hasOwnProperty("errorData")) {
    alert(data.message);
    return;
  }
  return data;
}
