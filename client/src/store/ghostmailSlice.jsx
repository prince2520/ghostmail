import { createSlice } from "@reduxjs/toolkit";


const initialGhostMailState = {
    id: "",
    currentAddress: "",
    currentMessages: [],
    mails: []
};

const GhostMailSlice = createSlice({
    name: "ghostMail",
    initialState: initialGhostMailState,
    reducers: {

    }
});


export const GhostMailActions = GhostMailSlice.actions;
export default GhostMailSlice.reducer;