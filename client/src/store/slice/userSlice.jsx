import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    id: "",
    name: "",
    email: "",
    mails: []
};

const UserSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        saveUserData(state, action) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email,
            state.mails = action.payload.mails;
        },
        addNewMail(state, action){
            state.mails.push(action.payload);
        }
    }
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;