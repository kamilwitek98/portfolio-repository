import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API}`,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${process.env.REACT_APP_API_KEY}`);
            headers.set('Content-Type', 'application/json;charset=utf-8')
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getTopMovies: builder.query({ query: () => `/movie/top_rated`}),
        getTradings: builder.query({ query: () => `/trending/all/day`}),
        getMovieDetails: builder.query({ query: ({type, id}) => `/${type}/${id}`}),
        getImages: builder.query({ query: ({type, id}) => `/${type}/${id}/images`}),
        getVideos: builder.query({ query: ({type, id}) => `/${type}/${id}/videos`}),
        getCredits: builder.query({ query: ({type, id}) => `/${type}/${id}/credits`}),
        getPerson: builder.query({ query: ({ id }) => `/person/${id}`}),
        getPersonImages: builder.query({ query: ({ id }) => `/person/${id}/images`}),
        getPersonCombinedCredits: builder.query({ query: ({ id }) => `/person/${id}/combined_credits`}),
        getSearch: builder.query({ query: ({ search }) => `/search/multi?query=${search}`}),
        getUpcoming: builder.query({ query: () => `/movie/upcoming`}),
        
    })
})

export const {
    useGetTopMoviesQuery,
    useGetTradingsQuery,
    useGetMovieDetailsQuery,
    useGetImagesQuery,
    useGetVideosQuery,
    useGetCreditsQuery,
    useGetPersonQuery,
    useGetPersonCombinedCreditsQuery,
    useGetPersonImagesQuery,
    useLazyGetSearchQuery,
    useGetUpcomingQuery,
} = moviesApi