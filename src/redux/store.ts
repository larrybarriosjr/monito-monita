import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import membersSlice from "./membersSlice"
import wishlistsSlice from "./wishlistsSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    members: membersSlice,
    wishlists: wishlistsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
