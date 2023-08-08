import React, { useEffect, useState } from "react";
import { IconFork, IconIssue, IconStar, OpenSecProjectsContainer } from "./OpenSecProjectsElements";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { InternshipDesc, InternshipHeader, InternshipHeading } from "../Internship/InternshipElements";

const OpenSecProjects = () => {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        fetch("https://api.github.com/users/thecyberworld/repos")
            .then((response) => response.json())
            .then((data) => setRepositories(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Wrapper>
            <OpenSecProjectsContainer>
                <InternshipHeader>
                    <InternshipHeading> OpenSec Projects </InternshipHeading>
                    <InternshipDesc> Contribute to our open source projects. </InternshipDesc>
                </InternshipHeader>
                <div className={"cards"}>
                    {repositories
                        .sort((a, b) => b?.stargazers_count - a?.stargazers_count)
                        .map((repository) => (
                            <Card key={repository.id} repository={repository} />
                        ))}
                </div>
            </OpenSecProjectsContainer>
        </Wrapper>
    );
};

const Card = ({ repository }) => {
    // eslint-disable-next-line camelcase
    const { name, description, html_url, stargazers_count, forks_count, open_issues_count } = repository;
    return (
        <div className="card">
            <span>
                <div className="card-header">
                    <h2>{name}</h2>
                    <div className={"counts"}>
                        <div className="fork-count">
                            <IconIssue />
                            {/* eslint-disable-next-line camelcase */}
                            <span>{open_issues_count}</span>
                        </div>
                        <div className="fork-count">
                            <IconFork />
                            {/* eslint-disable-next-line camelcase */}
                            <span>{forks_count}</span>
                        </div>
                        <div className="star-count">
                            <IconStar />
                            {/* eslint-disable-next-line camelcase */}
                            <span>{stargazers_count}</span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <p>{description}</p>
                    {/* eslint-disable-next-line camelcase */}
                </div>
            </span>
            <div className="card-footer">
                {/* eslint-disable-next-line camelcase */}
                <a href={html_url} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                </a>
            </div>
        </div>
    );
};

export default OpenSecProjects;
