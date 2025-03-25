import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { mailData } from "../../api/mail";
import { Mail, IMailSlice } from "@/types/mail.d";

// REDUX THUNK -  Fetch The mail detail 
export const fetchMailDetail = createAsyncThunk(
    'mail/fetchMailDetail',
    async ({ mailId, token, isNotAuth }: { mailId: string , token: string | undefined, isNotAuth: boolean }, { getState, rejectWithValue }) => {
        const state: any = getState();
        const alreadyExitMail = state.mail.mails.some((m: Mail) => m.id === mailId);

        try {
            let result = null;

            if (!alreadyExitMail) {
                result = await mailData(token, mailId);
            }

            return { mailId, mail: result, alreadyExitMail, isNotAuth };
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);


// INITIAL STATE
const initialMailState: IMailSlice = {
    currMailId: null,
    mails: []
};

const MailSlice = createSlice({
    name: "mail",
    initialState: initialMailState,
    reducers: {
        saveMessage(state, action) {
            const mailId = action.payload.mailId;
            // state.mails.find((mail) => mail.id === mailId)?.messages.push(action.payload);

            const mail = state.mails.find((mail) => mail.id === mailId);

            if (mail) {
                mail.messages?.push(action.payload)
            }
        },
        addNewMail(state, action) {
            if (!state.mails.some((mail) => mail.id === action.payload.id)) {
                state.mails.push(action.payload);
            }
        },
        deleteMail(state, action) {
            state.currMailId = null;
            state.mails = state.mails.filter((mail: Mail) => mail.id != action.payload.mailId);
        },
        changeMailAddress(state, action) {
            state.mails.map((mail) => {
                if (mail.id === action.payload.mailId) {
                    mail.address = action.payload.updatedMailAddress;
                }
            })
        },
        deleteMessageFromMail(state, action) {
            state.mails.map((mail) => {
                if (mail.id == action.payload.mailId) {
                    mail.messages = mail.messages?.filter(message => message.id !== action.payload.messageId);
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMailDetail.fulfilled, (state, action) => {
                state.currMailId = action.payload.mailId;

                if (action.payload.isNotAuth) {
                    state.mails.length = 0;
                }

                if (!action.payload.alreadyExitMail) {
                    if (action.payload.mail) {
                        state.mails.push(action.payload.mail);
                    }
                }
            })
    },
});


export const MailActions = MailSlice.actions;
export default MailSlice.reducer;