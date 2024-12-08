import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { mailData } from "../api/mail";
import { act } from "react";


export const fetchMailDetail = createAsyncThunk(
    'mail/fetchMailDetail',
    async ({mailId, token}, { getState, rejectWithValue }) => {


        const state = getState();

        const alreadyExitMail = state.mail.mails.find(m => m.id === mailId);

        if (alreadyExitMail) {
            return rejectWithValue('Mail already exists, so no need to fetch data'); // Reject if mail is found
        }

        try {
            const result = await mailData(token, mailId);

            return { mailId, mail: result };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const initialMailState = {
    currMailId: null,
    mails: []
};



const MailSlice = createSlice({
    name: "mail",
    initialState: initialMailState,
    reducers: {
        saveMessage(state, action){
            const mailId = action.payload.mailId;
            state.mails.find(mail=>mail.id === mailId)?.messages.push(action.payload);

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMailDetail.pending, (state, action) => {
                console.log("action payload", action.payload); 
            })
            .addCase(fetchMailDetail.fulfilled, (state, action) => {
                console.log('success ', action.payload)
                state.currMailId = action.payload.mailId;
                state.mails.push(action.payload.mail);
            })
            .addCase(fetchMailDetail.rejected, (state, action) => {
                console.log('Rejected action payload:', action);
                console.log('Rejected action error:', action.error.message);
            })
    },
});


export const MailActions = MailSlice.actions;
export default MailSlice.reducer;