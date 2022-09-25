const API_URL = process.env.REACT_APP_BASE_URL + "/api"

const fetchApi = (url: string, method = "GET", body?: string | Record<string, unknown>) => {
  return fetch(API_URL + url, { body: JSON.stringify(body), method })
}

export const login = (password: string) => {
  return fetchApi("/login", "POST", password).then(response => {
    if (response.status === 400) {
      throw new Error()
    }
    return response.json()
  })
}

export const getAllMembers = () => {
  return fetchApi("/members-get-all").then(response => {
    if (response.status === 400) {
      throw new Error()
    }
    return response.json()
  })
}

export const getWishlists = (name: string) => {
  return fetchApi("/wishlists-get", "POST", name).then(response => {
    if (response.status === 400) {
      throw new Error()
    }
    return response.json()
  })
}

export const updateWishlists = (data: { name: string; wishlist: string[] }) => {
  return fetchApi("/wishlists-update", "POST", data).then(response => {
    if (response.status === 400) {
      throw new Error()
    }
    return response.json()
  })
}
