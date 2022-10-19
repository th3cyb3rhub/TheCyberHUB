import React from "react";
import {
  Section,
  WriteUpSection,
  AuthorSection,
  AuthorImage,
  AuthorUsername,
  Date,
  ContentBody,
  Content,
  Heading,
  Paragraph,
  ImageSection,
  Image,
  ContentFooter,
  Tag,
  MinRead,
  Bookmark,
  MarginTop,
  HR,
} from "./WriteUpsElements";

import { MdOutlineBookmarkAdd, MdBookmarkAdded, MdOutlineBookmarkRemove } from "react-icons/md";
import { BsFillBookmarkXFill } from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/all";

export const WriteUps = () => {
  return (
    <WriteUpSection>
      <Section>
        <h1>🛠 Under Development 🛠</h1>
      </Section>
      <AuthorSection>
        <AuthorImage src="https://miro.medium.com/fit/c/176/176/1*WrWKJOzibjROkAF5S5Qn8w.jpeg" alt={"Steiner255"} />
        <AuthorUsername>Steiner255</AuthorUsername>
        <Date>5 Days Ago</Date>
      </AuthorSection>
      <MarginTop />

      <ContentBody>
        <Content>
          <Heading>Another day, Another IDOR vulnerability — $5000 Reddit Bug Bounty</Heading>
          <MarginTop />
          <Paragraph>
            Gaining unprivileged access to Reddit moderator logs — Here we go. Again. IDOR, or insecure direct object
            reference, is a common yet insecure....
          </Paragraph>
        </Content>
        <ImageSection>
          <Image src="https://miro.medium.com/fit/c/224/224/1*cRu3ETnHdt6n-z96oedxPQ.png" alt="Bootcamp" />
        </ImageSection>
      </ContentBody>
      <MarginTop />
      <MarginTop />
      <ContentFooter>
        <Tag>Bug Bounty</Tag>
        <MinRead>2 min read</MinRead>
        <Bookmark>
          <MdOutlineBookmarkAdd />
          {/*<MdBookmarkAdded/>*/}
          {/*<MdOutlineBookmarkRemove/>*/}
          {/*<BsFillBookmarkXFill/>*/}
          <AiOutlineShareAlt />
        </Bookmark>
      </ContentFooter>

      <MarginTop />
      <MarginTop />

      <HR />
    </WriteUpSection>
  );
};

export default WriteUps;
