import { createSlice } from "@reduxjs/toolkit"

export enum REQUEST_STATUS {
  IDLE = "IDLE",
  FETCHING = "FETCHING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

interface WishlistsState {
  data: string[]
  status: REQUEST_STATUS
}

const initialState: WishlistsState = {
  data: [],
  status: REQUEST_STATUS.IDLE,
}

export const wishlistsSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setWishLists: (state, action) => {
      state.data = action.payload
    },
    setWishListStatus: (state, action) => {
      state.status = action.payload
    },
  },
})

export const { setWishLists, setWishListStatus } = wishlistsSlice.actions
export default wishlistsSlice.reducer
