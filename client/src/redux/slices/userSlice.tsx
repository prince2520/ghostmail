import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user.d";
import { getUserThunk, googleAuthThunk, loginThunk } from "../thunks/userThunk";
import { toast } from "react-toastify";

const setUserState = (state: User, action: PayloadAction<{ token: string; data: User; success: boolean }>) => {
    console.log("setUserState ", action.payload)
    state.id = action.payload.data.id;
    state.name = action.payload.data.name;
    state.email = action.payload.data.email;
    state.token = action.payload.token;
    state.isAuth = true;

    toast(`Login Successfully!`, {
        type: "success"
    });
};

// INITIAL STATE
const initialUserState: User = {
    id: "",
    name: "",
    email: "",
    token: "",
    isAuth: false
};

const UserSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload.token;
        },
        setIsAuth(state, action) {
            state.isAuth = action.payload.isAuth;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.fulfilled, setUserState)
            .addCase(loginThunk.rejected, (_, action) => {
                toast(`${action.payload}, {
                    type: "error"
                }`);
            })


        builder
            .addCase(googleAuthThunk.fulfilled, setUserState)
            .addCase(googleAuthThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder

            .addCase(getUserThunk.fulfilled, setUserState)
            .addCase(getUserThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

    }
})

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;