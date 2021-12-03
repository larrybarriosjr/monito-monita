import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import membersSlice from "./membersSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    members: membersSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
