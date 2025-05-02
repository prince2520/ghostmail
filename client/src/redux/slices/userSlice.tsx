import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user.d";
import { getUserThunk, googleAuthThunk, loginThunk } from "../thunks/userThunk";
import { toast } from "react-toastify";

export const getUserReducer = (state: User, action: PayloadAction<{ token: string; data: User; success: boolean }>) => {
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
            .addCase(loginThunk.fulfilled, getUserReducer)
            .addCase(loginThunk.rejected, (_, action) => {
                toast(`${action.payload}, {
                    type: "error"
                }`);
            })


        builder
            .addCase(googleAuthThunk.fulfilled, getUserReducer)
            .addCase(googleAuthThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder

            .addCase(getUserThunk.fulfilled, getUserReducer)
            .addCase(getUserThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

    }
})

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;