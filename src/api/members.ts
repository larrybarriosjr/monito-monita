const BASE_URL = "/.netlify/functions"

export const getAllMembers = () => {
  return fetch(BASE_URL + "/members-get-all").then(response => response.json())
}
