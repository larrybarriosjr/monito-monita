const API_URL = process.env.REACT_APP_BASE_URL + "/api"

export const login = (password: string) => {
  return fetch(API_URL + "/login", {
    body: JSON.stringify(password),
    method: "POST",
  }).then(response => response.json())
}

export const getAllMembers = () => {
  return fetch(API_URL + "/members-get-all").then(response => response.json())
}

export const getWishlists = (name: string) => {
  return fetch(API_URL + "/wishlists-get", {
    body: JSON.stringify(name),
    method: "POST",
  }).then(response => response.json())
}

export const updateWishlists = (data: { name: string; wishlist: string[] }) => {
  return fetch(API_URL + "/wishlists-update", {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => response.json())
}
