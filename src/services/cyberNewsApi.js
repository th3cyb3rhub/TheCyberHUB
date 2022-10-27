import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cyberNewsApiApiHeaders = {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    "X-RapidAPI-Key": "c6214cbce5msh836e428558fddd1p1afbdajsn86d4b8af74d9",
};
const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cyberNewsApiApiHeaders });

export const cyberNewsApi = createApi({
    reducerPath: "cyberNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCyberNews: builder.query({
            query: ({ newsCategory, count }) =>
                createRequest(
                    `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
                ),
        }),
    }),
});

export const { useGetCyberNewsQuery, useLazyGetCyberNewsQuery } = cyberNewsApi;
