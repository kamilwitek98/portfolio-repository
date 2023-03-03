import { configureStore } from '@reduxjs/toolkit';
import { tanksApi } from '../services/tanksApi';
import authSliceReducer from "../slices/authSlice";

export default configureStore({
    reducer: {
        [tanksApi.reducerPath]: tanksApi.reducer,
        token: authSliceReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tanksApi.middleware),
})