import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gamesApi = createApi({
    reducerPath: 'gamesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://boardgames-production.up.railway.app`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().token.token
            if(token){
                headers.set('Authorization', `Bearer ${token}`)
                return headers
            }
        }
    }),
    tagTypes: ['Game', 'User'],
    endpoints: (builder) => ({
        getGames: builder.query({
            query: () => `/games`,
            providesTags: ['Game']
        }),

        createGame: builder.mutation({
            query: (patch) => ({
                url: `/games`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: ['Game']
        }),

        updateGame: builder.mutation({
            query: ({ id, patch}) => ({
                url: `/games/${id}`,
                method: 'PATCH',
                body: patch
            }),
            invalidatesTags: ['Game']
        }),

        deleteGame: builder.mutation({
            query: (id) => ({
                url: `/games/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Game'],
        }),

        signIn: builder.mutation({
            query: (formData) => ({
                url: `user/signin`,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['User']           
        }),

        signUp: builder.mutation({
            query: (formData) => ({
                url: '/user/signup',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['User']
        }),

        getUsers: builder.query({
            query: () => `/user`,
            providesTags: ['User']
        }),

        updateUser: builder.mutation({
            query: (id) =>({
                url: `user/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['User']
        })
            



    })
})

export const {
    useGetGamesQuery,
    useCreateGameMutation,
    useDeleteGameMutation,
    useUpdateGameMutation,
    useSignInMutation,
    useSignUpMutation,
    useGetUsersQuery,
    useUpdateUserMutation
} = gamesApi