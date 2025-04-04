import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserRequest, googleAuthRequest, loginRequest, signupRequest } from "../api/user";
import { CredentialResponse } from "@react-oauth/google";

// REDUX THUNK - delete a mail
export const getUser = createAsyncThunk(
    'user/getUser',
    async ({ token }: { token: string }, { rejectWithValue }) => {
        try {
            let response = await getUserRequest(token);
            return {...response, token};

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


// REDUX THUNK - delete a mail
export const signup = createAsyncThunk(
    'user/signup',
    async ({ name, email, password, confirmPassword }: { name: string, email: string, password: string, confirmPassword: string }, { rejectWithValue }) => {
        try {
            let response = await signupRequest(name, email, password, confirmPassword);
            return response;

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// REDUX THUNK - delete a mail
export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {

            let response = await loginRequest(email, password);
            return response;

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// REDUX THUNK - delete a mail
export const googleAuth = createAsyncThunk(
    'user/googleAuth',
    async ({ credentialResponse }: { credentialResponse: CredentialResponse }, { rejectWithValue }) => {
        try {

            let response = await googleAuthRequest(credentialResponse);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);