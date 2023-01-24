import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    updatedGame: {},
}

const updatedGameSlice = createSlice({
    name: 'updatedGame',
    initialState,
    reducers: {
        setUpdatedGame(state, action) {
            state.updatedGame = action.payload
        },
    },
})

export const { setUpdatedGame } = updatedGameSlice.actions
export default updatedGameSlice.reducer