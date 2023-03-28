import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "../services/moviesApi";

export default configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware),
})