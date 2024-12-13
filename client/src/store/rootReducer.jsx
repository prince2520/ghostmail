import { combineReducers } from '@reduxjs/toolkit';

import userReducer from "./slice/userSlice";
import mailReducer from "./slice/mailSlice";

import { resetState } from './resetAction';

const appReducer = combineReducers({
    user: userReducer,
    mail: mailReducer,
});

const rootReducer = (state, action) => {
    if (action.type === resetState.type) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;