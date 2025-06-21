import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload; // Set user data
        },
        removeUser: (state) => {
            return null; // Remove user data
        }
    }
    },
)

export const { addUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;