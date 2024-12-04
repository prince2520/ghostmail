import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import mailReducer from "./mailSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    mail: mailReducer
  }
});

export default store;