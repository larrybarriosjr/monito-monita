import { configureStore } from "@reduxjs/toolkit"
import membersSlice from "./membersSlice"
import wishlistsSlice from "./wishlistsSlice"

export const store = configureStore({
  reducer: {
    members: membersSlice,
    wishlists: wishlistsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
