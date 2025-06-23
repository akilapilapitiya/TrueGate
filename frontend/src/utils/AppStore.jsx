import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

const AppStore = configureStore({
  reducer: {
    user: userReducer, // User slice reducer
  },
});

export default AppStore;
