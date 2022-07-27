import React from 'react';
import {Button, ButtonLink, RouterButton} from '../../Buttons/ButtonElements';
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
                         buttonType,
                         link,
                         link2,
                         lightBg,
                         lightText,
                         topLine,
                         headline,
                         description,
                         buttonLabel,
                         buttonLabel2,
                         buttonLabel3,
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
                                        ) }

                                    {buttonType === 'link' && (
                                            <ButtonLink
                                                href={link}
                                                primary={primary ? 'true' : ''}
                                                dark={dark ? 1 : 0}
                                                dark2={dark2 ? 1 : 0}
                                            >
                                                {buttonLabel}
                                            </ButtonLink>
                                        ) }

                                    <ScrollText
                                        to={"contribute"}
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        exact={"true"}
                                        offset={-80}
                                    >
                                        {buttonLabel2}
                                    </ScrollText>
                                    <ScrollText
                                        to={"join"}
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        exact={"true"}
                                        offset={-80}
                                    >
                                        {buttonLabel3}
                                    </ScrollText>
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