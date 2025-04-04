import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user.d";
import { getUser, googleAuth, login } from "../thunks/userThunk";

const setUserState = (state: User, action: PayloadAction<{ token: string; data: User; success: boolean }>) => {
    state.id = action.payload.data.id;
    state.name = action.payload.data.name;
    state.email = action.payload.data.email;
    state.token = action.payload.token;
    state.isAuth = true;
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

        builder
            .addCase(googleAuth.fulfilled, setUserState)

        builder
            .addCase(getUser.fulfilled, setUserState)
    }
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;