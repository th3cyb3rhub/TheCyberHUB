import React from 'react';
import {
    EventsContainer,
    EventHeading,
    EventContent,
    ContentList,
    EventSubHeading,
    EventSubHeadingSection, BGCTFImage, BGImage, ImageSection, CtfImage
} from "./EventsElemetns";
import {Link} from "../Resources/RoadmapResources/RoadmapResourcesElements";
import CTFImg from "../../assets/images/Capture.png";

const Events = () => {
    return (
        <EventsContainer>
            {/*<BGCTFImage>*/}
                {/*<BGImage src={"/src/assets/ctf.jpg"} type={'image'} />*/}
            {/*</BGCTFImage>*/}
            <ImageSection>
                <img src={CTFImg} alt=""/>
            </ImageSection>
            <EventSubHeading> This Saturday @10pm </EventSubHeading>
            <br/>
            {/*<EventHeading> TheCyberCTF </EventHeading>*/}
            <EventSubHeadingSection>
                <EventSubHeading>
                    Price: TryHackMe Voucher
                </EventSubHeading>
                <EventContent>
                    Top 3 will get 1 month Voucher.
                </EventContent>
            </EventSubHeadingSection>
            <EventContent>
                <ContentList>
                    Join our <Link href="https://discord.gg/QHBPq6xP5p" target={"_blank"}>
                    <b> Discord </b> </Link> server.
                </ContentList>
                <ContentList>For more details and questions.</ContentList>
                <ContentList>CTF link will be given at discord server before 10m.</ContentList>

                <br/>

                More details will be added soon.
            </EventContent>
        </EventsContainer>
    );
};

export default Events;