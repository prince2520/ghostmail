import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user.d";
import { getUser, googleAuth, login } from "../thunks/userThunk";
import { toast } from "react-toastify";

const setUserState = (state: User, action: PayloadAction<{ token: string; data: User; success: boolean }>) => {
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
            .addCase(login.fulfilled, setUserState)
            .addCase(login.rejected, (_, action) => {
                toast(`${action.payload}, {
                    type: "error"
                }`);
            })


        builder
            .addCase(googleAuth.fulfilled, setUserState)
            .addCase(googleAuth.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder

            .addCase(getUser.fulfilled, setUserState)
            .addCase(getUser.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

    }
})

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;