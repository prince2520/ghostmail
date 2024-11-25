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

    }
});

export const UserSliceActions = UserSlice.actions;
export default UserSlice.reducer;