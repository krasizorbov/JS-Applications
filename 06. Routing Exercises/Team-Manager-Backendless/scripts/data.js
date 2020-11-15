const apiID = "5CDB2DC1-71AE-8E68-FF96-9307686C5100";
const apiKEY = "B2FA540B-16D2-42D2-B039-ECE1F1895865";
const registerURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/register`;
const loginURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/login`;
const teamsURL = `https://api.backendless.com/${apiID}/${apiKEY}/data/teams`;
const updateUserURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/`;
const logoutURL = `https://api.backendless.com/${apiID}/${apiKEY}/users/logout`;
const editTeamsURL = `https://api.backendless.com/${apiID}/${apiKEY}/data/teams/`;

export async function register(username, password) {
  const response = await fetch(registerURL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ username, password }),
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

export async function login(username, password) {
  const response = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ login: username, password }),
  });
  const data = await response.json();
  return data;
}

export async function updateUserHasTeamBoolean(userId) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(updateUserURL + userId, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "user-token": localStorage.getItem("userToken"),
    },
    body: JSON.stringify({ hasTeam: true }),
  });
  const data = await response.json();
  return data;
}

export async function updateUserDoesNotHaveTeamBoolean(userId) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(updateUserURL + userId, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "user-token": localStorage.getItem("userToken"),
    },
    body: JSON.stringify({ hasTeam: false }),
  });
  const data = await response.json();
  return data;
}

export async function createTeam(team) {
  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(teamsURL, {
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
  const result = await updateUserHasTeamBoolean(userId);
  if (result.hasOwnProperty("errorData")) {
    alert(result.message);
    return;
  }
  return data;
}

export async function getTeamById(id) {
  return (await fetch(teamsURL + "/" + id)).json();
}

export async function getTeams() {
  return (await fetch(teamsURL)).json();
}

export async function edit(team) {
  const token = localStorage.getItem("userToken");
  const teamId = localStorage.getItem("teamId");

  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(editTeamsURL + teamId, {
    method: "PUT",
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

export async function leave(team, id) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(editTeamsURL + id, {
    method: "PUT",
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

export async function join(team, id) {
  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  if (!token) {
    alert("User is not logged in!");
  }
  const response = await fetch(editTeamsURL + id, {
    method: "PUT",
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
  const result = await updateUserHasTeamBoolean(userId);
  if (result.hasOwnProperty("errorData")) {
    alert(result.message);
    return;
  }
  return data;
}
