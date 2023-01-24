import { configureStore } from "@reduxjs/toolkit";
import { gamesApi } from "../services/gamesApi";
import updatedGameSliceReducer from "../slices/updatedGameSlice";
import authSliceReducer from "../slices/authSlice";


export default configureStore({
    reducer: {
        [gamesApi.reducerPath]: gamesApi.reducer,
        updatedGameId: updatedGameSliceReducer,
        token: authSliceReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gamesApi.middleware),
})