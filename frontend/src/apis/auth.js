import { request } from "../utils/request";

export function getJwtToken() {
  return localStorage.getItem("jwtToken");
}
export function setJwtToken(jwt) {
  return localStorage.setItem("jwtToken", jwt);
}

export function saveUser(user) {
  return localStorage.setItem("user", JSON.stringify(user));
}
export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export async function register(email, username, password) {
  const result = await request("/api/auth/local/register", {
    method: "POST",
    auth: false,
    body: {
      email,
      username,
      password,
      name: username,
    },
  });
  if (result.jwt) {
    setJwtToken(result.jwt);
    saveUser(result.user);
  }
  return result.user;
}
export async function login(email, password) {
  const result = await request("/api/auth/local", {
    method: "POST",
    auth: false,
    body: {
      identifier: email,
      password,
    },
  });
  if (result.jwt) {
    setJwtToken(result.jwt);
    saveUser(result.user);
  }
  return result.user;
}
export async function logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}
