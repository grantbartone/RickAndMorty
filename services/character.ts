import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type Character = any; // TODO: define and move to a ./types folder

// Define a service using a base URL and expected endpoints
export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character',
  }),
  endpoints: builder => ({
    getCharacterByPage: builder.query<Character, string>({
      query: (page = '1') => `?page=${page}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetCharactersByPageQuery} = characterApi;
