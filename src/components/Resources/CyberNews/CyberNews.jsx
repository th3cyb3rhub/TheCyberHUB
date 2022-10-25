import React, { useState } from "react";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetCyberNewsQuery, useLazyGetCyberNewsQuery, cyberNewsApi } from "../../../services/cyberNewsApi";
import {
  CyberNewsSection, SectionHeading, Link, AuthorImage, AuthorSection, AuthorUsername, Content, ContentBody, ContentFooter, Date, Heading, HR, Image, ImageSection, MarginTop, Paragraph, CyberNewsBody,
} from "./CyberNewsElements";
import Loader from "./Loader";
import { useDispatch } from "react-redux";

const demoImage = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const CyberNews = ({ simplified }) => {
  const [skip, setSkip] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const currNewsCount = simplified ? 6 : 12;
  const [newsCategory, setNewsCategory] = useState(`cybersecurity`);
  const initialNewsQueryParams = {
    newsCategory,
    count: currNewsCount,
  };
  const { data: cyberNews } = useGetCyberNewsQuery(initialNewsQueryParams);
  const dispatch = useDispatch();
  const [getCyberNewsTrigger] = useLazyGetCyberNewsQuery();

  if (!cyberNews?.value) return <Loader />;

  const fetchMoreCyberNews = async () => {
    setSkip(skip + 1);
    try {
      const newNews = await getCyberNewsTrigger({
        newsCategory,
        count: currNewsCount * skip,
      });
      const newNewsArray = [...newNews.data.value];
      newNewsArray.splice(0, (skip - 1) * currNewsCount);
      if (newNews.data.value.length === 0 || newNews.data.value.length < currNewsCount * skip - 1) {
        setHasMore(false);
      } else {
        setSkip(skip + 1);
      }
      dispatch(
        cyberNewsApi.util.updateQueryData("getCyberNews", initialNewsQueryParams, (draftNews) => {
          newNewsArray.map((temp) => draftNews.value.push(temp));
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CyberNewsSection>
      <SectionHeading style={{ textAlign: "center", margin: "-80px 0 50px 0" }}> Latest Security NEWS </SectionHeading>
      <InfiniteScroll
        dataLength={cyberNews.value.length}
        hasMore={hasMore}
        next={fetchMoreCyberNews}
        loader={<Loader />}
        endMessage={<p>You've reached the end</p>}
      >
        {cyberNews.value.map((news, i) => (
          <div key={i}>
            <CyberNewsBody>
              <MarginTop />

              <ContentBody>
                <Content>
                  <Link href={news.url} target={"_blank"} rel={"noreferrer"}>
                    <Heading>{news.name}</Heading>
                  </Link>
                  <MarginTop />
                  <Paragraph>
                    {news.description > 100 ? `${news.description.substring(0, 100)} ...` : news.description}
                  </Paragraph>
                </Content>
                <ImageSection>
                  <Image src={news?.image?.thumbnail?.contentUrl || demoImage} alt={"news image"} />
                </ImageSection>
              </ContentBody>

              <MarginTop />
              <MarginTop />

              <ContentFooter>
                <AuthorSection>
                  <AuthorImage src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt={"Nill"} />
                  <AuthorUsername>{news.provider[0]?.name}</AuthorUsername>
                  <Date>{moment(news.datePublished).startOf("ss").fromNow()}</Date>
                </AuthorSection>
              </ContentFooter>

              <MarginTop />
              <MarginTop />

              <HR />
            </CyberNewsBody>

            <MarginTop />
            <MarginTop />
            <MarginTop />
            <MarginTop />
            <MarginTop />
          </div>
        ))}
      </InfiniteScroll>
    </CyberNewsSection>
  );
};

export default CyberNews;
