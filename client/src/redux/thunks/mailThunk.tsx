import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMailRequest, createAuthorizedMailRequest, createUnAuthorizedMailRequest, deleteMailRequest, deleteMessageRequest, updateMailAddressRequest } from "../api/mail";
import { RootState } from "../store";

// MIDDLEWARES
// REDUX THUNK - create a new mail
export const createNewMail = createAsyncThunk(
    'mail/createNewMail',
    async ({ token }: { token: string }, { getState, rejectWithValue }) => {
        try {
            let response;

            let state = getState() as RootState;

            if (state.user.isAuth)
                response = await createAuthorizedMailRequest(token);
            else
                response = await createUnAuthorizedMailRequest();

            return { ...response, isAuth: state.user.isAuth };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


// REDUX THUNK -  get the mail 
export const getMail = createAsyncThunk(
    'mail/getMail',
    async ({ mailId, token, isAuth }: { mailId: string, token?: string, isAuth: boolean }, { rejectWithValue }) => {
        try {
            let result = await getMailRequest(token, mailId);
            return { mailId, mail: result, isAuth };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);



// REDUX THUNK - delete a mail
export const deleteMail = createAsyncThunk(
    'mail/deleteMail',
    async ({ token, mailId, mailAddress }: { token?: string, mailId?: string, mailAddress?: string }, { rejectWithValue }) => {

        try {
            let response = await deleteMailRequest(token, mailId, mailAddress);
            return { ...response, mailId, mailAddress };

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);



// REDUX THUNK - update a mail
export const updateMailAddress = createAsyncThunk(
    'mail/updateMail',
    async ({ token, mailId, mailAddress }: { token: string, mailId?: string, mailAddress?: string }, { rejectWithValue }) => {
        try {
            let response = await updateMailAddressRequest(token, mailId, mailAddress);
            console.log("response", response);
            return { ...response, mailId, mailAddress };

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


// REDUX THUNK - delete a message
export const deleteMessage = createAsyncThunk(
    'mail/deleteMessage',
    async ({ token, mailId, messageId }: { token: string, mailId: string, messageId: string }, { rejectWithValue }) => {

        try {
            let response = deleteMessageRequest(token, mailId, messageId);
            return { ...response, mailId, messageId };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

