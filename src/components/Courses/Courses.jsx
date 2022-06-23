import React from 'react';
import {ButtonLink} from '../Buttons/ButtonElements';
import {
    InfoContainer,
    InfoWrapper,
    InfoRow,
    Column1,
    Column2,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    ImgWrap,
    Img,
} from "../Info/InfoElements";

const Courses = ({id, lightBg, lightText, topLine, headline, description, buttonLabel, buttonLabel2, buttonLabel3, imgStart, img, alt, dark, dark2, primary, darkText
                    }) => {
    return (
        <>
            <InfoContainer id={id} lightBg={lightBg}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine> {topLine} </TopLine>
                                <Heading lightText={lightText}> {headline} </Heading>
                                <Subtitle darkText={darkText}> {description} </Subtitle>
                                <BtnWrap>
                                    <ButtonLink
                                        href={"https://www.youtube.com/channel/UCvWsxW1ahIwGAziU4MfLp6A"}
                                        target={"_blank"}
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        exact={"true"}
                                        offset={-80}
                                        primary={primary ? 'true' : ''}
                                        dark={dark ? 1 : 0}
                                        dark2={dark2 ? 1 : 0}
                                    >
                                        {buttonLabel}
                                    </ButtonLink>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={img} alt={alt}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </>
    );
};

export default Courses;