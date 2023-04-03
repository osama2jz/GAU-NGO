import { Text, Card, Flex, Badge, Container } from "@mantine/core";
import { useStyles } from "./styles";
import { Users } from "tabler-icons-react";
import { Progress } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import routeNames from "../../../Routes/routeNames";

const Cards = ({ data, setUrl, url, setPage }) => {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(routeNames.socialWorker.projectCases, {
      state: { id: data.id },
    });
  };

  return (
    <>
      <Card
        className={classes.card}
        shadow="lg"
        h={150}
        w={matches ? 330 : 240}
        component="a"
        radius={26}
        withBorder
        onClick={handleClick}
        style={{
          cursor: "pointer",
          backgroundColor: data.url === url ? "" : "",
          border: data.url === url ? "2px solid #ADB5BD" : "",
        }}
      >
        <Badge
          color={data?.status ? "blue.8" : "green.0"}
          radius="xl"
          variant="outline"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            bottom: "10px",
          }}
        >
          {data?.status ? "inprogress" : "completed"}
        </Badge>

        <Flex align={"center"} justify="space-between" mt="none">
          <Text weight={800} size="xl" mt="sm" color={"#5C5F66"}>
            {data.title}
          </Text>
          {/* <img
            src={new URL(`../../assets/${data.icon}.png`, import.meta.url).href}
            alt="icon"
            width={"30px"}
          /> */}

          {/* <Users /> */}
        </Flex>

        <Text mt="0px" fw="bolder" size={30}>
          {data.value ? data.value : Math.floor(Math.random() * 100)}
        </Text>
        {/* <Text size="xs" m="none">50%</Text> */}
        <Progress
          mt="sm"
          value={88}
          color={data?.status ? "blue.8" : "green.0"}
          size={6}
        />
      </Card>
    </>
  );
};
export default Cards;
