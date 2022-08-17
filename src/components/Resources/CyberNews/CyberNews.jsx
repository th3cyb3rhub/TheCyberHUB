import React, {useState} from 'react';
import moment from 'moment';

import {useGetCyberNewsQuery} from "../../../services/cyberNewsApi";
import {
    CyberNewsSection,
    SectionHeading,
    Link,
    AuthorImage,
    AuthorSection,
    AuthorUsername,
    Content,
    ContentBody,
    ContentFooter,
    Date,
    Heading,
    HR,
    Image,
    ImageSection,
    MarginTop,
    Paragraph,
    CyberNewsBody,
} from "./CyberNewsElements";

const demoImage = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg"

const CyberNews = ({simplified}) => {
    const [newsCategory, setNewsCategory] = useState('cybersecurity')
    const {data: cyberNews} = useGetCyberNewsQuery({newsCategory, count: simplified ? 6 : 30});
    if (!cyberNews?.value) return "<Loader/>";

    return (
        <CyberNewsSection>
            <SectionHeading style={{textAlign: "center", margin: "-80px 0 50px 0"}}> Latest CyberNews</SectionHeading>
            {cyberNews.value.map((news, i) => (
                <>
                    <CyberNewsBody>
                        <MarginTop/>

                        <ContentBody>
                            <Content>
                                <Link href={news.url} target={"_blank"} rel={"noreferrer"}>
                                    <Heading>
                                        {news.name}
                                    </Heading>
                                </Link>
                                <MarginTop/>
                                <Paragraph>
                                    {news.description > 100 ? `${news.description.substring(0, 100)} ...` : news.description}
                                </Paragraph>
                            </Content>
                            <ImageSection>
                                <Image src={news?.image?.thumbnail?.contentUrl || demoImage}
                                       alt={"news image"}/>
                            </ImageSection>
                        </ContentBody>

                        <MarginTop/>
                        <MarginTop/>

                        <ContentFooter>
                            <AuthorSection>
                                <AuthorImage src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                                             alt={"Nill"}/>
                                <AuthorUsername>
                                    {news.provider[0]?.name}
                                </AuthorUsername>
                                <Date>
                                    {moment(news.datePublished).startOf('ss').fromNow()}
                                </Date>
                            </AuthorSection>
                        </ContentFooter>

                        <MarginTop/>
                        <MarginTop/>

                        <HR/>

                    </CyberNewsBody>

                    <MarginTop/>
                    <MarginTop/>
                    <MarginTop/>
                    <MarginTop/>
                    <MarginTop/>
                </>
            ))}
        </CyberNewsSection>
    );
};

export default CyberNews;
