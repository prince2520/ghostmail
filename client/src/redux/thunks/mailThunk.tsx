import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMailAPI, createAuthorizedMailAPI, createUnAuthorizedMailAPI, deleteMailAPI, deleteMessageAPI, updateMailAddressAPI } from "../api/mailAPI";
import { RootState } from "../store";

// MIDDLEWARES
// REDUX THUNK - create a new mail
export const createNewMailThunk = createAsyncThunk(
    'mail/createNewMail',
    async ({ token }: { token: string }, { getState, rejectWithValue }) => {
        try {
            let response;

            let state = getState() as RootState;

            if (state.user.isAuth)
                response = await createAuthorizedMailAPI(token);
            else
                response = await createUnAuthorizedMailAPI();

            return { ...response, isAuth: state.user.isAuth };
        } catch (error:any) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


// REDUX THUNK -  get the mail 
export const getMailThunk = createAsyncThunk(
    'mail/getMail',
    async ({ mailId, token, isAuth }: { mailId: string, token?: string, isAuth: boolean }, { rejectWithValue }) => {
        try {
            let result = await getMailAPI(token, mailId);
            return { mailId, mail: result, isAuth };
        } catch (error:any) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);



// REDUX THUNK - delete a mail
export const deleteMailThunk = createAsyncThunk(
    'mail/deleteMail',
    async ({ token, mailId, mailAddress }: { token?: string, mailId?: string, mailAddress?: string }, { rejectWithValue }) => {

        try {
            let response = await deleteMailAPI(token, mailId, mailAddress);
            return { ...response, mailId, mailAddress };

        } catch (error:any) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);



// REDUX THUNK - update a mail
export const updateMailAddressThunk = createAsyncThunk(
    'mail/updateMailAddress',
    async ({ token, mailId, mailAddress }: { token: string, mailId?: string, mailAddress?: string }, { rejectWithValue }) => {
        try {
            let response = await updateMailAddressAPI(token, mailId, mailAddress);
            return { ...response, mailId, mailAddress };

        } catch (error:any) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


// REDUX THUNK - delete a message
export const deleteMessageThunk = createAsyncThunk(
    'mail/deleteMessage',
    async ({ token, mailId, messageId }: { token: string, mailId: string, messageId: string }, { rejectWithValue }) => {

        try {
            let response = await deleteMessageAPI(token, mailId, messageId);
            return { ...response, mailId, messageId };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

