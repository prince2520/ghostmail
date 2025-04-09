import { createSlice } from "@reduxjs/toolkit";

import { Mail } from "@/types/mail.d";
import { createNewMail, deleteMail, deleteMessage, getMail, updateMailAddress } from "../thunks/mailThunk";
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
            .addCase(createNewMail.fulfilled, (state, action) => {
                if (!action.payload.isAuth) {
                    state.currMailId = action.payload.data.id;
                    state.mails.length = 0;
                }

                state.mails.push(action.payload.data);

                toast(`${action.payload.data.address} created successfully!`, {
                    type: "success"
                })
            })
            .addCase(createNewMail.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder
            .addCase(getMail.fulfilled, (state, action) => {
                state.currMailId = action.payload.mailId;
                state.mails.push(action.payload.mail);
            })
            .addCase(getMail.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder
            .addCase(deleteMail.fulfilled, (state, action) => {
                state.currMailId = "";

                toast(`${action.payload.mailAddress} deleted successfully!`, {
                    type: "success"
                });

                state.mails = state.mails.filter((mail: Mail) => mail.id != action.payload.mailId);
            })
            .addCase(deleteMail.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })



        builder
            .addCase(updateMailAddress.fulfilled, (state, action) => {
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
            .addCase(updateMailAddress.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })


        builder
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.mails.map((mail) => {
                    if (mail.id == action.payload.mailId) {
                        toast(`${action}`, {
                            type: "success"
                        });
                        mail.messages = mail.messages?.filter(message => message.id !== action.payload.messageId);
                    }
                    return mail;
                })
            })
            .addCase(deleteMessage.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

    },
});


export const MailActions = MailSlice.actions;
export default MailSlice.reducer;