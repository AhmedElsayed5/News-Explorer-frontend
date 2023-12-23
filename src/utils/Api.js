const apiKey = "5e8acd24b2fa44d4b9ed1feb7645978c";
const date = new Date();
const tempTo = date.toISOString();
date.setDate(date.getDate() - 7);
const tempFrom = date.toISOString();
const pageSize = 100;
const to = tempTo.slice(0, 10);
const from = tempFrom.slice(0, 10);

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/top-headlines?country=us&"
    : "https://newsapi.org/v2/everything?";

// GET https://nomoreparties.co/news/v2/top-headlines?country=us&apiKey=[your_key]

// const baseUrl = "https://newsapi.org/v2/everything?";

export const getItems = (q) => {
  return fetch(
    `${baseUrl}apiKey=${apiKey}&q=${q}&from=${from}&to=${to}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        authorization: apiKey,
      },
    }
  )
    .then(checkResponse)
    .then((res) => res.articles);
};
