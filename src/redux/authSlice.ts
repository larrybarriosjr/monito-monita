import { createSlice } from "@reduxjs/toolkit"

export enum LOGIN_STATUS {
  IDLE = "IDLE",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

interface LoginState {
  status: LOGIN_STATUS
}

const initialState: LoginState = {
  status: LOGIN_STATUS.IDLE,
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
  },
})

export const { setStatus } = loginSlice.actions
export default loginSlice.reducer
