import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const jsonPlaceholderApi = createApi({
  reducerPath: "jsonPlaceholderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
    }),
  }),
});

 
export const {
    useGetPostsQuery,
    useCreatePostMutation
} = jsonPlaceholderApi
