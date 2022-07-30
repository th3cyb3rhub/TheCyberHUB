import React from 'react';
import {Section, AuthorImage, AuthorUsername, Date,Content, Heading, Paragraph, ImageSection,Image, Tag, MinRead, Bookmark} from './WriteUpsElements';

import {BsBookmarkPlus, BsBookmarkCheck, BsBookmarkDash} from 'react-icons/bs';


const WriteUps = () => {
    return (
        <Section>
            <AuthorImage src="https://miro.medium.com/fit/c/176/176/1*WrWKJOzibjROkAF5S5Qn8w.jpeg" alt={"Steiner255"} />
            <AuthorUsername>
                Steiner255
            </AuthorUsername>
            <Date>
               . 5 Days Ago
            </Date>
            <Content>

            <Heading>
                    $$$ bounty in less 3 minutes from a google dork
            </Heading>
                ~ Hi Bug Bounty Hunters & CyberSecurity folks!!! It’s been long since i dropped a bug bounty writeup. Got lots of them in store, and i will be sharing them soonest possible. Just stay tuned, remember: Practice Make....
            <Paragraph>
            </Paragraph>
            </Content>
            <ImageSection>
                <Image src="https://miro.medium.com/fit/c/224/224/1*cRu3ETnHdt6n-z96oedxPQ.png" alt="Bootcamp" />
            </ImageSection>

            <Tag>
                Bug Bounty
            </Tag>
            <MinRead>
                2 min read
            </MinRead>
            <Bookmark>
                <BsBookmarkPlus/>
                <BsBookmarkCheck/>
                <BsBookmarkDash/>
            </Bookmark>
        </Section>
    );
};

export default WriteUps;