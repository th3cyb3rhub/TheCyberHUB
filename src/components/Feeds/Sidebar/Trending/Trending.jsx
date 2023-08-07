import React from "react";
import { TrendingContainer } from "./TrendingElements";

const Trending = () => {
    // create  a trending tags dummy data

    const tags = [
        { id: 1, name: "javascript" },
        { id: 2, name: "react" },
        { id: 3, name: "nodejs" },
        { id: 4, name: "express" },
        { id: 5, name: "mongodb" },
    ];

    return (
        <TrendingContainer>
            <h1>Trending</h1>
            <ul>
                {tags.map((tag) => (
                    <li key={tag.id}>{tag.name}</li>
                ))}
            </ul>
        </TrendingContainer>
    );
};

export default Trending;
