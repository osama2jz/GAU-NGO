import React from "react";
import { useState } from "react";
import { useStyles } from "../styles";
import { Avatar, Box, Flex, Rating, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const AppReviews = () => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 820px)");
  const [goToSlide, setGoToSlide] = useState(null);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Dr. Lisa K., Local Healthcare Provider",
      content: (
        <Avatar
          radius={"50%"}
          size={isMobile ? "100px" : "150px"}
          // size={"150px"}
          src="https://blog-pixomatic.s3.appcnt.com/image/22/01/26/61f166e07f452/_orig/pixomatic_1572877263963.png"
        />
      ),
      review:
        "I am incredibly impressed with GAU's Housing First initiative. They prioritize providing immediate, permanent housing solutions for individuals experiencing chronic homelessness. Their dedication to securing stable housing and providing support services is truly commendable.",
    },
    {
      id: 2,
      name: "John D., Community Member",
      content: (
        <Avatar
          radius={"50%"}
          size={isMobile ? "100px" : "150px"}
          style={{ cursor: "hover" }}
          // size={"150px"}
          src="https://i.pinimg.com/736x/97/31/02/9731022f0be7c965e880505461643850.jpg"
        />
      ),
      review:
        "The employment and skills training programs offered by GAU are exceptional. They provide individuals with the necessary resources and training to secure employment and achieve financial stability. Their commitment to empowering individuals and breaking the cycle of homelessness is inspiring.",
    },
    {
      id: 3,
      name: "Kate, Local Government Official",
      content: (
        <Avatar
          radius={"50%"}
          style={{ cursor: "hover" }}
          size={isMobile ? "100px" : "150px"}
          // size={"150px"}
          src="https://images.squarespace-cdn.com/content/v1/5cf0d08d5fc69d000172462a/1599805610146-J0G5GMGFBXVWND4Z71UK/Aleem+Business+Headshot+for+LinkedIn+Profile.jpg"
        />
      ),
      review:
        "Their outreach and support services have made a significant impact in our community. Their comprehensive approach, including healthcare access, mental health support, and substance abuse counseling, ensures that individuals experiencing homelessness receive the necessary care and support to rebuild their lives.",
    },
    {
      id: 4,
      name: "Dr. Lisa K., Local Healthcare Provider",
      content: (
        <Avatar
          radius={"50%"}
          style={{ cursor: "hover" }}
          size={isMobile ? "100px" : "150px"}
          // size={"150px"}
          src="https://media.istockphoto.com/id/1154642632/photo/close-up-portrait-of-brunette-woman.jpg?s=612x612&w=0&k=20&c=d8W_C2D-2rXlnkyl8EirpHGf-GpM62gBjpDoNryy98U="
        />
      ),
      review:
        "I have witnessed firsthand the positive impact of GAU's advocacy and policy initiatives. They actively work to bring about systemic changes and collaborate with government agencies to address homelessness. Their dedication to driving meaningful policy changes is commendable.",
    },
    {
      id: 5,
      name: "Alex T, Goverment Official",
      content: (
        <Avatar
          radius={"50%"}
          style={{ cursor: "hover" }}
          size={isMobile ? "100px" : "150px"}
          src="https://wallpapers.com/images/hd/professional-profile-pictures-1276-x-1762-075347emr82ph3hj.jpg"
        />
      ),
      review:
        "Their outreach and support services have made a significant impact in our community. Their comprehensive approach, including healthcare access, mental health support, and substance abuse counseling, ensures that individuals experiencing homelessness receive the necessary care and support to rebuild their lives.",
    },
  ]);
  const cardss = data.map((element, index) => {
    return {
      ...element,
      onClick: () => {
        setGoToSlide(index);
        handleChange(index);
      },
    };
  });
  const [display, setDisplay] = useState(data?.[2]);
  const handleChange = (ind) => {
    let a = data[ind];
    setDisplay(a);
  };

  return (
    <Flex direction="column" gap={"lg"} m="md">
      <Title align="center">{translate("USERS REVIEWS")}</Title>
      <Text align="center" w={isMobile ? "90%" : "50%"} m="auto">
        {translate(
          "We believe in the power of feedback, and our reviews section serves as a platform for sharing opinions, experiences, and recommendations. Whether you're looking for validation or seeking a different perspective, our reviews section is the perfect place to find authentic feedback and connect with our community."
        )}
      </Text>

      <Box h="200px" w={isMobile ? "90%" : "40%"} m="auto">
        <Carousel
          slides={cardss}
          goToSlide={goToSlide}
          offsetRadius={2}
          // showNavigation={true}
          animationConfig={config.gentle}
        />
      </Box>
      <Stack
        className={classes.review}
        w={isMobile ? "80%" : "60%"}
        align="center"
        m="auto"
      >
        <Title order={2}>{display.name}</Title>
        <Rating value={5} readOnly />
        <Text> {display.review}</Text>
      </Stack>
    </Flex>
  );
};

export default AppReviews;
