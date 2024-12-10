import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import mailReducer from "./slice/mailSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    mail: mailReducer
  }
});

export default store;