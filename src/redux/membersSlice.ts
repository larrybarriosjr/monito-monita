import { createSlice } from "@reduxjs/toolkit"

interface MembersState {
  data: string[]
}

const initialState: MembersState = {
  data: [],
}

export const membersSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setMemberList: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { setMemberList } = membersSlice.actions
export default membersSlice.reducer
