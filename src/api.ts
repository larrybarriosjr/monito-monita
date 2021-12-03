const BASE_URL = "/.netlify/functions"

export const login = (password: string) => {
  return fetch(BASE_URL + "/login", {
    body: JSON.stringify(password),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

export const getAllMembers = () => {
  return fetch(BASE_URL + "/members-get-all").then(response => response.json())
}

export const getWishlists = (name: string) => {
  return fetch(BASE_URL + "/wishlists-get", {
    body: JSON.stringify(name),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}
