import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tanksApi = createApi({
    reducerPath: 'gamesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://tanksserver-production.up.railway.app',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().token.token
            if(token){
                headers.set('Authorization', `Bearer ${token}`)
                return headers
            }
        }
    }),
    tagTypes: ['Tanks', 'User'],
    endpoints: (builder) => ({
        getTanks: builder.query({
            query: () => '/tanks',
            providesTags: ['Tanks']
        }),

        createTank: builder.mutation({
            query: (patch) => ({
                url: `/tanks`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: ['Tanks']
        }),

        updateTank: builder.mutation({
            query: ({ id, patch }) => ({
                url: `/tanks/${id}`,
                method: 'PATCH',
                body: patch
            }),
            invalidatesTags: ['Tanks']
        }),

        deleteTank: builder.mutation({
            query: (id) => ({
                url: `/tanks/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Tanks'],
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
    })

})

export const { 
    useGetTanksQuery,
    useCreateTankMutation,
    useUpdateTankMutation,
    useDeleteTankMutation,
    useSignInMutation,
    useSignUpMutation
} = tanksApi