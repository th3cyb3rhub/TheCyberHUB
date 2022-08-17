import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const cyberNewsApiApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': 'b1d57f69b3mshadfcecfc9e489a6p14b18cjsn87ec366e56b2'
}
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cyberNewsApiApiHeaders});


export const cyberNewsApi = createApi({
    reducerPath: 'cyberNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCyberNews: builder.query({
            query: ({
                        newsCategory,
                        count
                    }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});

export const {useGetCyberNewsQuery} = cyberNewsApi