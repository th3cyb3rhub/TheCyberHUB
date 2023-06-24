import React, { useEffect, useState } from "react";
import ComingSoon from "../Other/MixComponents/ComingSoon";
import { OpenSecProjectsContainer } from "./ProjectsElements";

const OpenSecProjects = () => {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        fetch("https://api.github.com/users/thecyberworld/repos")
            .then((response) => response.json())
            .then((data) => setRepositories(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <ComingSoon />

            {repositories.length === 0 && (
                <OpenSecProjectsContainer>
                    {repositories
                        .sort((a, b) => b.stargazers_count - a.stargazers_count)
                        .map((repository) => (
                            <Card key={repository.id} repository={repository} />
                        ))}
                </OpenSecProjectsContainer>
            )}
        </>
    );
};

const StarIcon = () => (
    <svg aria-label="star" viewBox="0 0 16 16" version="1.1" width="16" height="16">
        <path
            fillRule="evenodd"
            d="M8 .25a.75.75 0 0 0-.684.446L5.01 4.698l-3.468.51a.75.75 0 0 0-.417 1.282l2.51 2.448-.593 3.454a.75.75 0 0 0 1.088.791L8 11.347l3.079 1.634a.75.75 0 0 0 1.088-.79l-.592-3.454 2.51-2.448a.75.75 0 0 0-.417-1.283l-3.468-.51L8.684.696A.75.75 0 0 0 8 .25zm0 2.286a.75.75 0 0 1 .535.22l1.974 1.924.467 2.722a.75.75 0 0 1-1.088.791L8 6.687l-2.448 1.292a.75.75 0 0 1-1.088-.79l.467-2.722L7.465 2.756A.75.75 0 0 1 8 2.536z"
        ></path>
    </svg>
);

const ForkIcon = () => (
    <svg aria-label="fork" viewBox="0 0 16 16" version="1.1" width="16" height="16">
        <path
            fillRule="evenodd"
            d="M5 1.75a.75.75 0 0 0-.75.75V6H1.75a.75.75 0 0 0 0 1.5h3.5v3.25a.75.75 0 0 0 1.5 0V7.5h3.25a.75.75 0 0 0 0-1.5H6.25V2.5a.75.75 0 0 0-.75-.75z"
        ></path>
        <path
            fillRule="evenodd"
            d="M6 1.75A2.75 2.75 0 0 1 8.75 4.5v6.086a2.75 2.75 0 1 1-1.5 0V4.5A2.75 2.75 0 0 1 6 1.75zM4.25 4.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm5.5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"
        ></path>
    </svg>
);

const Card = ({ repository }) => {
    // eslint-disable-next-line camelcase
    const { name, description, html_url, stargazers_count, forks_count } = repository;

    console.log(repository);
    return (
        <div className="card">
            <div className="card-header">
                <h2>{name}</h2>
                <div className="star-count">
                    <StarIcon />
                    {/* eslint-disable-next-line camelcase */}
                    <span>{stargazers_count}</span>
                </div>
                <div className="fork-count">
                    <ForkIcon />
                    {/* eslint-disable-next-line camelcase */}
                    <span>{forks_count}</span>
                </div>
            </div>
            <div className="card-body">
                <p>{description}</p>
                {/* eslint-disable-next-line camelcase */}
                <a href={html_url} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                </a>
            </div>
        </div>
    );
};

export default OpenSecProjects;
