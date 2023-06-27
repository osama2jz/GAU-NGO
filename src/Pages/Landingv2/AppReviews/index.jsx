import React from "react";
import { useState } from "react";
import { useStyles } from "../styles";
import { Avatar, Box, Flex, Rating, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";

const AppReviews = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 820px)");
  const [goToSlide, setGoToSlide] = useState(null);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Kate Gabiha",
      content: (
        <Avatar
          radius={"50%"}
          size={isMobile ? "100px" : "150px"}
          // size={"150px"}
          src="https://blog-pixomatic.s3.appcnt.com/image/22/01/26/61f166e07f452/_orig/pixomatic_1572877263963.png"
        />
      ),
      review:
        "1. I heard about faces2hire from a friend that told me about a free service. I signed up on the site and created my profile which is similar to a resume format. I have to say that I am actually the first person at faces2hire to be hired by its own platform.You never know who will be looking for a candidate to bring into their company. I hope to help others find their new favorite place to work.",
    },
    {
      id: 2,
      name: "John Wick",
      content: (
        <Avatar
          radius={"50%"}
          size={isMobile ? "100px" : "150px"}
          // size={"150px"}
          src="https://i.pinimg.com/736x/97/31/02/9731022f0be7c965e880505461643850.jpg"
        />
      ),
      review:
        "2. I heard about faces2hire from a friend that told me about a free service. I signed up on the site and created my profile which is similar to a resume format. I have to say that I am actually the first person at faces2hire to be hired by its own platform.You never know who will be looking for a candidate to bring into their company. I hope to help others find their new favorite place to work.",
    },
    {
      id: 3,
      name: "Bob Builder",
      content: (
        <Avatar
          radius={"50%"}
          size={isMobile ? "100px" : "150px"}
          // size={"150px"}
          src="https://images.squarespace-cdn.com/content/v1/5cf0d08d5fc69d000172462a/1599805610146-J0G5GMGFBXVWND4Z71UK/Aleem+Business+Headshot+for+LinkedIn+Profile.jpg"
        />
      ),
      review:
        "3. I heard about faces2hire from a friend that told me about a free service. I signed up on the site and created my profile which is similar to a resume format. I have to say that I am actually the first person at faces2hire to be hired by its own platform.You never know who will be looking for a candidate to bring into their company. I hope to help others find their new favorite place to work.",
    },
    {
      id: 4,
      name: "Mike Allison",
      content: (
        <Avatar
          radius={"50%"}
          size={isMobile ? "100px" : "150px"}
          // size={"150px"}
          src="https://media.istockphoto.com/id/1154642632/photo/close-up-portrait-of-brunette-woman.jpg?s=612x612&w=0&k=20&c=d8W_C2D-2rXlnkyl8EirpHGf-GpM62gBjpDoNryy98U="
        />
      ),
      review:
        "4. I heard about faces2hire from a friend that told me about a free service. I signed up on the site and created my profile which is similar to a resume format. I have to say that I am actually the first person at faces2hire to be hired by its own platform.You never know who will be looking for a candidate to bring into their company. I hope to help others find their new favorite place to work.",
    },
    {
      id: 5,
      name: "Viking King",
      content: (
        <Avatar
          radius={"50%"}
          size={isMobile ? "100px" : "150px"}
          src="https://wallpapers.com/images/hd/professional-profile-pictures-1276-x-1762-075347emr82ph3hj.jpg"
        />
      ),
      review:
        "5. I heard about faces2hire from a friend that told me about a free service. I signed up on the site and created my profile which is similar to a resume format. I have to say that I am actually the first person at faces2hire to be hired by its own platform.You never know who will be looking for a candidate to bring into their company. I hope to help others find their new favorite place to work.",
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
    // let newArr = [];
    let a = data[ind];
    // data[ind] = data[2];
    // data[2] = a;
    // newArr = [...data];
    setDisplay(a);
    // setData(newArr);
  };

  return (
    <Flex direction="column" gap={"lg"} m="md">
      <Title align="center">APP REVIEWS</Title>
      <Text align="center" w={isMobile ? "90%" : "50%"} m="auto">
        There are many variations of passages of Lorem Ipsum available, but the
        majorityhave suffered alteration in some form, by injected
        humour,available
      </Text>
      {/* 
      <Flex gap={"xl"} justify={"center"} align={"center"} h="150px">
        {data.map((obj, ind) => (
          <Avatar
            src={obj.img}
            key={obj.id}
            radius={"50%"}
            className={classes.avatar}
            style={{
              border: ind === 2 ? "3px solid green" : "",
              transition: "0.3s ease-in-out",
              cursor: "pointer",
            }}
            size={
              ind === 2 ? "150px" : ind === 0 || ind === 4 ? "50px" : "100px"
            }
            onClick={() => handleChange(ind)}
          />
        ))}
      </Flex> */}
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
        <Rating value={3} readOnly/>
        <Text> {display.review}</Text>
      </Stack>
    </Flex>
  );
};

export default AppReviews;
