import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('profile'));
const token = user?.token;

const initialState = {
    token
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentToken(state, action){
            state.token = action.payload
        },
    }
})

export const { setCurrentToken } = authSlice.actions
export default authSlice.reducer