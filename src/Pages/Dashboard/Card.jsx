import { Text, Card, Flex } from "@mantine/core";
import { useStyles } from "./styles";
import { Users } from "tabler-icons-react";
import { Progress } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Cards = ({ data, setUrl, url, setPage }) => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const matches = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();
  const handleClick = () => {
    setPage && setPage(1);
    if (data.link) {
      navigate(data.link);
    } else if (data.url) {
      setUrl(data.url);
    }
  };

  return (
    <>
      <Card
        className={classes.card}
        shadow="lg"
        h={150}
        w={matches ? 320 : 240}
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
        <Flex align={"center"} justify="space-between" mt="none">
          <Text weight={600} size="lg" mt="none" color="dimmed">
            {translate(data.title)}
          </Text>
          <img
            src={new URL(`../../assets/${data.icon}.png`, import.meta.url).href}
            alt="icon"
            width={"30px"}
          />
          {/* <Users /> */}
        </Flex>

        <Text mt="0px" fw="bolder" size={30}>
          {data.value ? data.value : "0"}
        </Text>
        {/* <Text size="xs" m="none">50%</Text> */}
        <Progress mt="sm" value={88} color={data.color} size={6} />
      </Card>
    </>
  );
};
export default Cards;
