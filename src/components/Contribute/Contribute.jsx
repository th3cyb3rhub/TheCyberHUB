import React from 'react';
import {Button, ButtonLink} from '../Buttons/ButtonElements';
import {
    ContributeContainer,
    ContributeWrapper,
    ContributeRow,
    Column1,
    Column2,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    ImgWrap,
    Img,
    TextLink
} from "./ContributeElements";

const Contribute = ({id, lightBg, lightText, topLine, headline, description, buttonLabel, buttonLabel2, buttonLabel3, imgStart, img, alt, dark, dark2, primary, darkText
                     }) => {
    return (
        <>
            <ContributeContainer id={id} lightBg={lightBg}>
                <ContributeWrapper>
                    <ContributeRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine> {topLine} </TopLine>
                                <Heading lightText={lightText}> {headline} </Heading>
                                <Subtitle darkText={darkText}> {description} </Subtitle>
                                <BtnWrap>
                                    <ButtonLink
                                        href={"https://github.com/thecyberworld"}
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
                    </ContributeRow>
                </ContributeWrapper>
            </ContributeContainer>
        </>
    );
};

export default Contribute;