import { useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import appSS from "../../../assets/appSS.png";
import { Box, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "../styles";

const AppScreenshots = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 1020px)");
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards] = useState([
    { key: 0, content: <img src={appSS} height={"100%"} key={0} /> },
    { key: 1, content: <img src={appSS} height={"100%"} key={1} /> },
    { key: 2, content: <img src={appSS} height={"100%"} key={2} /> },
    { key: 3, content: <img src={appSS} height={"100%"} key={3} /> },
    { key: 4, content: <img src={appSS} height={"100%"} key={4} /> },
  ]);
  const cardss = cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });
  return (
    <Stack className={classes.appSS}>
      <Title align="center" order={isMobile ? 2 : 1}>
        App Screenshots
      </Title>
      <Text align="center" m="auto" w={isMobile ? "90%" : "70%"}>
        There are many variations of passages of Lorem Ipsum available, but the
        majorityhave suffered alteration in some form, by injected
        humour,available
      </Text>
      <Carousel
        slides={cardss}
        goToSlide={goToSlide}
        offsetRadius={2}
        // showNavigation={true}
        animationConfig={config.gentle}
      />
    </Stack>
  );
};

export default AppScreenshots;
