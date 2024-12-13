import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { mailData } from "../../api/mail";


// REDUX THUNK -  Fetch The mail detail 
export const fetchMailDetail = createAsyncThunk(
    'mail/fetchMailDetail',
    async ({ mailId, token }, { getState, rejectWithValue }) => {
        const state = getState();

        const alreadyExitMail = state.mail.mails.some(m => m.id === mailId);

        try {
            let result = null;

            if (!alreadyExitMail) {
                result = await mailData(token, mailId);
            }

            return { mailId, mail: result, alreadyExitMail };
        } catch (error) {
            return rejectWithValue(error.ymessage);
        }
    }
);



// INITIAL STATE
const initialMailState = {
    currMailId: null,
    mails: []
};


const MailSlice = createSlice({
    name: "mail",
    initialState: initialMailState,
    reducers: {
        saveMessage(state, action) {
            const mailId = action.payload.mailId;
            state.mails.find(mail => mail.id === mailId)?.messages.push(action.payload);
        },
        addNewMail(state, action) {
            state.mails.push(action.payload);
        },
        deleteMail(state, action) {
            state.currMailId = null; 
            state.mails = state.mails.filter(mail => mail.id != action.payload.mailId);
        },
        changeMailAddress(state, action) {
            state.mails.map(mail => {
                if (mail.id === action.payload.mailId) {
                    mail.address = action.payload.updatedMailAddress;
                }
            })
        }       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMailDetail.pending, (state, action) => {
                console.log("action payload", action.payload);
            })
            .addCase(fetchMailDetail.fulfilled, (state, action) => {
                state.currMailId = action.payload.mailId;

                if (!action.payload.alreadyExitMail) {
                    state.mails.push(action.payload.mail);
                }
            })
            .addCase(fetchMailDetail.rejected, (state, action) => {
                console.log('Rejected action payload:', action);
                console.log('Rejected action error:', action.error.message);
            });
    },
});


export const MailActions = MailSlice.actions;
export default MailSlice.reducer;