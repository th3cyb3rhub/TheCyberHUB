import React from "react";
import { LoadingBlogContainer, LoadingContainer, LoadingImage, LoadingLine } from "./LoadingBlogCardElements";
import {
    BlogImageSection,
    ContainerCard,
    Description,
    DetailsSection,
    MainSection,
    SubSection,
    Title,
} from "./NewBlogCardElements";

const LoadingLineAnimation = ({ height }) => {
    return (
        <LoadingContainer>
            <LoadingLine height={height} />
        </LoadingContainer>
    );
};
const LoadingImageAnimation = ({ height }) => {
    return (
        <LoadingContainer>
            <LoadingImage height={height} />
        </LoadingContainer>
    );
};

const LoadingBlogCard = () => {
    return (
        <ContainerCard>
            <LoadingBlogContainer>
                <MainSection>
                    <DetailsSection>
                        <BlogImageSection>
                            <LoadingImageAnimation height={150} />
                        </BlogImageSection>
                    </DetailsSection>
                    <SubSection>
                        <Title>
                            <LoadingLineAnimation height={12} />
                        </Title>
                        <Description>
                            <LoadingLineAnimation height={10} />
                        </Description>
                    </SubSection>
                </MainSection>
            </LoadingBlogContainer>
        </ContainerCard>
    );
};

export default LoadingBlogCard;
