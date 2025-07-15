import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    removeUser: () => {
      return {
        user: null,
        token: null,
      };
    },
  },
});

export const { addUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
