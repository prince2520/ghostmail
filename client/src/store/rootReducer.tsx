import { combineReducers, UnknownAction } from '@reduxjs/toolkit';

import userReducer from "./slice/userSlice";
import mailReducer from "./slice/mailSlice";

import { resetState } from './resetAction';
import { IMailSlice } from '@/types/mail.d';
import { User } from '@/types/user.d';

const appReducer = combineReducers({
    user: userReducer,
    mail: mailReducer,
});

const rootReducer = (state: Partial<{ user: User | undefined; mail: IMailSlice | undefined; }> | undefined, action: UnknownAction) => {
    if (action.type === resetState.type) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;