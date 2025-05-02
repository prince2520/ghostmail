import { createSlice } from "@reduxjs/toolkit";

import { Mail } from "@/types/mail.d";
import { createNewMailThunk, deleteMailThunk, deleteMessageThunk, getMailThunk, updateMailAddressThunk } from "../thunks/mailThunk";
import { toast } from "react-toastify";


// INITIAL STATE
const initialMailState: {
    currMailId: string,
    mails: Mail[]
} = {
    currMailId: "",
    mails: []
};

const MailSlice = createSlice({
    name: "mail",
    initialState: initialMailState,
    reducers: {
        getMails(state, action) {
            state.mails = action.payload;
        },
        createMessage(state, action) {
            const mailId = action.payload.mailId;
            const mail = state.mails.find((mail) => mail.id === mailId);

            if (mail) {
                mail.messages?.push(action.payload)
            }
        },
        updateCurrentMailId(state, action) {
            state.currMailId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewMailThunk.fulfilled, (state, action) => {
                if (!action.payload.isAuth) {
                    state.currMailId = action.payload.data.id;
                    state.mails.length = 0;
                }

                state.mails.push(action.payload.data);

                toast(`${action.payload.data.address} created successfully!`, {
                    type: "success"
                })
            })
            .addCase(createNewMailThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder
            .addCase(getMailThunk.fulfilled, (state, action) => {
                state.currMailId = action.payload.mailId;
                state.mails.push(action.payload.mail);
            })
            .addCase(getMailThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder
            .addCase(deleteMailThunk.fulfilled, (state, action) => {
                state.currMailId = "";

                toast(`${action.payload.mailAddress} deleted successfully!`, {
                    type: "success"
                });

                state.mails = state.mails.filter((mail: Mail) => mail.id != action.payload.mailId);
            })
            .addCase(deleteMailThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })



        builder
            .addCase(updateMailAddressThunk.fulfilled, (state, action) => {
                state.mails.map((mail) => {
                    if (mail.id === action.payload.mailId) {
                        toast(`${mail.address} updated to ${action.payload.updatedMailAddress}!`, {
                            type: "success"
                        });
                        mail.address = action.payload.updatedMailAddress;
                    }
                    return mail;
                })

            })
            .addCase(updateMailAddressThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })


        builder
            .addCase(deleteMessageThunk.fulfilled, (state, action) => {
                state.mails.map((mail) => {
                    if (mail.id == action.payload.mailId) {
                        toast(`${action.payload.message}`, {
                            type: "success"
                        });
                        mail.messages = mail.messages?.filter(message => message.id !== action.payload.messageId);
                    }
                    return mail;
                })
            })
            .addCase(deleteMessageThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

    },
});


export const MailActions = MailSlice.actions;
export default MailSlice.reducer;