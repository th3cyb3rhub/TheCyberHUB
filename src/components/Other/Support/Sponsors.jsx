import React from "react";
import {
    BuyMeACoffeeImage,
    DotSymbol,
    SponsorsContainer,
    SponsorsDescription,
    SponsorsDescriptionContainer,
    SponsorsH1,
    SponsorsLink,
    SponsorsP,
    TextGreenBG,
} from "./SponsorsElements";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";

const Sponsors = () => {
    return (
        <Wrapper>
            <SponsorsContainer>
                <SponsorsH1>
                    Now you can support
                    <TextGreenBG> TheCyberHUB Community </TextGreenBG>
                </SponsorsH1>
                <SponsorsDescriptionContainer>
                    <SponsorsDescription>
                        <DotSymbol />
                        <SponsorsP>
                            Thecyberhub is an initiative by TheCyberHUB Community to provide the best cyber security
                            resources to everyone for free.
                        </SponsorsP>
                    </SponsorsDescription>
                    <SponsorsDescription>
                        <DotSymbol />
                        <SponsorsP>
                            We are working on Cyber Security courses and We will release courses for free very soon.
                        </SponsorsP>
                    </SponsorsDescription>
                    <SponsorsDescription>
                        <DotSymbol /> <SponsorsP> Our websites and bots are running on the servers. </SponsorsP>
                    </SponsorsDescription>
                    <SponsorsDescription>
                        <DotSymbol />
                        <SponsorsP>
                            We also organize CTF weekly and provide prizes to the winners, and much more
                        </SponsorsP>
                    </SponsorsDescription>
                    <SponsorsDescription>
                        <DotSymbol />
                        <SponsorsP> Sponsors will help us recover server costs as well prize costs. </SponsorsP>
                    </SponsorsDescription>
                    <SponsorsDescription>
                        <DotSymbol />
                        <SponsorsP>
                            If you like our work and want to support us, you can support us on BuyMeACoffee.
                        </SponsorsP>
                    </SponsorsDescription>
                </SponsorsDescriptionContainer>
                <SponsorsLink href="https://www.buymeacoffee.com/th3cyb3rhub" target={"_blank"}>
                    <BuyMeACoffeeImage src="https://img.buymeacoffee.com/button-api/?text=Support our work from here&emoji=💰&slug=th3cyb3rhub&button_colour=ff6b08&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ff6b08" />
                </SponsorsLink>
            </SponsorsContainer>
        </Wrapper>
    );
};

export default Sponsors;
