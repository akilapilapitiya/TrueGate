import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload;
    },
    removeUser: (state) => {
      state.userData = null;
    },
    setUserRole: (state, action) => {
      if (
        state.userData &&
        state.userData.originalRole === "admin"
      ) {
        state.userData.role = action.payload;
      }
    },
  },
});

export const { addUser, removeUser, setUserRole } = userSlice.actions;
export default userSlice.reducer;
