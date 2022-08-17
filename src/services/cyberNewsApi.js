import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// const NEWS_RAPIDAPI_HOST = process.env.REACT_APP_NEWS_RAPIDAPI_HOST;
// const NEWS_RAPIDAPI_KEY = process.env.REACT_APP_NEWS_RAPIDAPI_KEY;
// const NEWS_API_URL = process.env.REACT_APP_NEWS_API_URL;


const cyberNewsApiApiHeaders = {
    'X-BingApis-SDK': 'true',
    // 'X-RapidAPI-Host': NEWS_RAPIDAPI_HOST,
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    // 'X-RapidAPI-Key': NEWS_RAPIDAPI_KEY
    'X-RapidAPI-Key': 'b1d57f69b3mshadfcecfc9e489a6p14b18cjsn87ec366e56b2'
}

// const baseUrl = NEWS_API_URL;
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cyberNewsApiApiHeaders});


export const cyberNewsApi = createApi({
    reducerPath: 'cyberNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({
                        newsCategory,
                        count
                    }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});

export const {useGetCyberNewsQuery} = cyberNewsApi