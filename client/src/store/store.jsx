import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import ghostmailReducer from "./ghostmailSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    ghostmail: ghostmailReducer
  }
});

export default store;