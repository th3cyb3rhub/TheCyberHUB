import React from "react";
import { BuyMeACoffeeImage, SponsorsContainer, SponsorsH1, SponsorsLink, SponsorsP } from "./SponsorsElements";

const Sponsors = () => {
    return (
        <SponsorsContainer>
            <SponsorsH1>Now you can sponsor Thecyberworld community</SponsorsH1>
            <SponsorsP>
                Thecyberhub is an initiative by Thecyberworld community <br />
                to provide the best cyber security resources to everyone for free. <br /> <br />
                <br />
                Our websites and bots are running on the servers. <br />
                We also organize CTF weekly and provide prizes to the winners, and much more <br />
                <br />
                Sponsors will help us recover server costs as well prize costs. <br />
                If you like our work and want to support us, you can sponsor us on BuyMeACoffee. <br />
            </SponsorsP>
            <SponsorsLink href="https://www.buymeacoffee.com/thecyberw0rld" target={"_blank"}>
                <BuyMeACoffeeImage
                    src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=thecyberw0rld&button_colour=32ec57&font_colour=000000&font_family=Comic&outline_colour=000000&coffee_colour=FFDD00"
                    alt={"thecyberworld buymeacoffe"}
                />
            </SponsorsLink>
        </SponsorsContainer>
    );
};

export default Sponsors;
