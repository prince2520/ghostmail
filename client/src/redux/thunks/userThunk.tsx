import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserRequest, googleAuthRequest, loginRequest, signupRequest } from "../api/user";
import { CredentialResponse } from "@react-oauth/google";
import { MailActions } from "../slices/mailSlice";

// REDUX THUNK - delete a mail
export const getUserThunk = createAsyncThunk(
    'user/getUser',
    async ({ token }: { token: string }, {dispatch,  rejectWithValue }) => {
        try {
            let response = await getUserRequest(token);
            dispatch(MailActions.getMails(response.data.mails));
            return { ...response, token };

        } catch (error: any) {
            return rejectWithValue(error || 'Something goes wrong!');
        }
    }
);


// REDUX THUNK - delete a mail
export const signupThunk = createAsyncThunk(
    'user/signup',
    async ({ name, email, password, confirmPassword }: { name: string, email: string, password: string, confirmPassword: string }, { rejectWithValue }) => {
        try {
            let response = await signupRequest(name, email, password, confirmPassword);
            return response;

        } catch (error: any) {
            return rejectWithValue(error.message || 'Something goes wrong!');
        }
    }
);

// REDUX THUNK - delete a mail
export const loginThunk = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string, password: string }, { dispatch, rejectWithValue }) => {
        try {

            let response = await loginRequest(email, password);
            dispatch(MailActions.getMails(response.data.mails));
            return response;

        } catch (error) {
            return rejectWithValue(error || 'Something goes wrong!');
        }
    }
);

// REDUX THUNK - delete a mail
export const googleAuthThunk = createAsyncThunk(
    'user/googleAuth',
    async ({ credentialResponse }: { credentialResponse: CredentialResponse }, { rejectWithValue }) => {
        try {

            let response = await googleAuthRequest(credentialResponse);

            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Something goes wrong!');
        }
    }
);