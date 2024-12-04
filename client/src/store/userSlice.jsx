import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    id: "",
    name: "",
    email: "",
    mailAddressAndIds: []
};

const UserSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        saveUserData(state, action) {
            console.log('Action ', action.payload)
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email,
            state.mailAddressAndIds = action.payload.mailAddressAndIds;
        }
    }
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;