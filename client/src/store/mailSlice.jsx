import { createSlice } from "@reduxjs/toolkit";


const initialMailState = {
    currMail: null,
    mails: []
};

const MailSlice = createSlice({
    name: "mail",
    initialState: initialMailState,
    reducers: {
        addMail(state, action){
           state.currMailAddress = action.payload.currMailAddress;
           state.mails = [...state.mails, action.payload.mail];
        }
    }
});


export const MailActions = MailSlice.actions;
export default MailSlice.reducer;