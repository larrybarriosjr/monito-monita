import { createSlice } from "@reduxjs/toolkit"

interface WishlistsState {
  data: string[]
}

const initialState: WishlistsState = {
  data: [],
}

export const wishlistsSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setWishLists: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { setWishLists } = wishlistsSlice.actions
export default wishlistsSlice.reducer
