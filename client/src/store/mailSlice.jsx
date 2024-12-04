import { createSlice } from "@reduxjs/toolkit";


const initialMailState = {
    currMailId: null,
    mails: []
};

const MailSlice = createSlice({
    name: "mail",
    initialState: initialMailState,
    reducers: {

    }
});


export const MailActions = MailSlice.actions;
export default MailSlice.reducer;