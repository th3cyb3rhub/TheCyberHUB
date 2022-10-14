import React from 'react';
import {Button, ButtonLink, RouterButton} from '../../MixComponents/Buttons/ButtonElements';
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
    ScrollText
} from "./InfoElements";
import {Link} from "react-router-dom";

const InfoSection = ({
                         id,
                         idTo,
                         idTo2,
                         buttonType,
                         link,
                         link2,
                         lightBg,
                         lightText,
                         topLine,
                         headline,
                         description,
                         buttonLabel,
                         buttonLabel1,
                         buttonLabel2,
                         buttonLabel3,
                         buttonLabel_ContributeToOpensource,
                         buttonLabel_joinCommunity,
                         imgStart,
                         img,
                         alt,
                         dark,
                         dark2,
                         primary,
                         darkText
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
                                    {buttonType === 'router' && (
                                        // <Link to='/resources'>
                                        <RouterButton
                                            to='/resources'
                                            primary={primary ? 'true' : ''}
                                            dark={dark ? 1 : 0}
                                            dark2={dark2 ? 1 : 0}
                                        >
                                            {buttonLabel}
                                        </RouterButton>
                                        // </Link>

                                    )}
                                    {buttonType === 'scroll' && (
                                        <Button
                                            to={idTo}
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
                                        </Button>
                                    )}

                                    {buttonLabel2 && (
                                        buttonType === 'scroll' && (
                                            <Button
                                                to={idTo2}
                                                smooth={true}
                                                duration={500}
                                                spy={true}
                                                exact={"true"}
                                                offset={-80}
                                                primary={primary ? 'true' : ''}
                                                dark={dark ? 1 : 0}
                                                dark2={dark2 ? 1 : 0}
                                            >
                                                {buttonLabel2}
                                            </Button>
                                        ))}

                                    {buttonType === 'link' && (
                                        <ButtonLink
                                            href={link}
                                            primary={primary ? 'true' : ''}
                                            dark={dark ? 1 : 0}
                                            dark2={dark2 ? 1 : 0}
                                        >
                                            {buttonLabel}
                                        </ButtonLink>
                                    )}
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

export default InfoSection;
