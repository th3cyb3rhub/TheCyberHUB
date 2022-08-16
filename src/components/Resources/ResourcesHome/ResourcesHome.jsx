import React from 'react';
import {Section} from "../WriteUps/WriteUpsElements";
import ResourcesList from "../ResourcesList";

const ResourcesHome = () => {
    return (
        <Section>
            <ResourcesList />
            <h1>Write-Ups</h1>
            <h1>Cyber News</h1>
            <h1>Events</h1>
        </Section>
    );
};

export default ResourcesHome;