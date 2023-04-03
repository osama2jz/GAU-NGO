import { Badge, Card, Flex, Progress, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

const Cards = ({ data, url }) => {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(routeNames.socialWorker.projectCases, {
      state: { id: data.id },
    });
  };

  return (
    <Card
      className={classes.card}
      shadow="lg"
      w={matches ? 330 : 240}
      component="a"
      radius={15}
      withBorder
      onClick={handleClick}
      style={{
        cursor: "pointer",
        backgroundColor: data.url === url ? "" : "",
        border: data.url === url ? "2px solid #ADB5BD" : "",
      }}
    >
      <Text weight={800} size="xl" align="center">
        {data.title}
      </Text>

      <Flex align={"center"} justify="space-between"> 
        <Text mt="0px" fw="bolder" color={"green.0"}>
          Total Cases: {data?.cases}
        </Text>
        <Badge
          color={data?.status ? "green.0" : "red.0"}
          radius="xl"
          size="xs"
          variant="filled"
        >
          {data?.status ? "in progress" : "completed"}
        </Badge>
      </Flex>
      <Text mt="0px" fw="bolder" color={"blue.0"}>
        Total Reports: {data?.reports}
      </Text>
      <Text mt="0px" fw="bolder" color={"red.0"}>
        Total Appointments: {data?.appointments}
      </Text>
    </Card>
  );
};
export default Cards;
