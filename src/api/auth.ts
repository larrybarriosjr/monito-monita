export const login = (password: string) => {
  return fetch("/.netlify/functions/login", {
    body: JSON.stringify(password),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}
