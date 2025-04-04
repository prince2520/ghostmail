import rootReducer from "./rootReducer";

import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 

export default store;


