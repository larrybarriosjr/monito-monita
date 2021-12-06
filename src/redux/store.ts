import { configureStore } from "@reduxjs/toolkit"
import wishlistsSlice from "./wishlistsSlice"

export const store = configureStore({
  reducer: {
    wishlists: wishlistsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
