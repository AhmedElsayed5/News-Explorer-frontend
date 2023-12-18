import { checkResponse } from "./Api";
export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.newsapp.crabdance.com"
    : "http://localhost:3001";

const headers = {
  "Content-type": "application/json",
};

export const signUp = ({ name, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);
};

export const signIn = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getCurrentUser = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
