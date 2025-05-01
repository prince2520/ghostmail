import { combineReducers, UnknownAction } from '@reduxjs/toolkit';

import userReducer from "./slices/userSlice";
import mailReducer from "./slices/mailSlice";

import { resetState } from './resetAction';
import { IMailSlice } from '@/types/mail.d';
import { User } from '@/types/user.d';

const appReducer = combineReducers({
    user: userReducer,
    mail: mailReducer,
});

const rootReducer = (state: Partial<{ user?: User; mail?: IMailSlice; }> | undefined, action: UnknownAction) => {
    if (action.type === resetState.type) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;