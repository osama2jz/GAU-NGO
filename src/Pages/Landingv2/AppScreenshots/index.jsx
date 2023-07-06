import { useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import appSS from "../../../assets/appSS.png";
import mobile1 from "../../../assets/mobile1.png";
import mobile2 from "../../../assets/mobile2.png";
import mobile3 from "../../../assets/mobile3.png";
import mobile4 from "../../../assets/mobile4.png";
import mobile5 from "../../../assets/mobile5.png";
import mobile6 from "../../../assets/mobile6.png";
import { Box, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "../styles";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const AppScreenshots = () => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 1020px)");
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards] = useState([
    { key: 1, content: <img src={mobile1} height={"100%"} key={1} /> },
    { key: 2, content: <img src={mobile2} height={"100%"} key={2} /> },
    { key: 3, content: <img src={mobile3} height={"100%"} key={3} /> },
    { key: 4, content: <img src={mobile4} height={"100%"} key={4} /> },
    { key: 5, content: <img src={mobile5} height={"100%"} key={5} /> },
    { key: 6, content: <img src={mobile6} height={"100%"} key={6} /> },
  ]);
  const cardss = cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });
  return (
    <Stack className={classes.appSS}>
      <Title align="center" order={isMobile ? 2 : 1}>
        {translate("App Screenshots")}
      </Title>
      <Text align="center" m="auto" w={isMobile ? "90%" : "100%"}>
        {translate(
          "Experience the intuitive user interface, seamless navigation, and stunning visuals that make our app stand out. Take a glimpse into the functionality and aesthetics that await you by exploring the captivating screenshots below. Get a taste of the exceptional user experience our app provides, and see why it's the perfect choice for your needs."
        )}
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
