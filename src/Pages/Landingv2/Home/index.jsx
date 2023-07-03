import {
  Box,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import Button from "../../../Components/Button";
import { useStyles } from "../styles";
import { Card } from "./Card";
import img1 from "../../../assets/home.png";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import routeNames from "../../../Routes/routeNames";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const Home = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 820px)");
  const isWeb = useMediaQuery("(min-width: 1200px)");
  return (
    <Grid
      className={classes.home}
      px={!isWeb ? "md" : "150px"}
      pb="50px"
      m="0px"
    >
      <Grid.Col lg={8}>
        <Stack spacing={"50px"} style={{ marginTop: "auto" }}>
          <Text
            fz={isMobile ? "40px" : "60px"}
            fw={"bolder"}
            lh={isMobile ? "40px" : "60px"}
          >
            {translate("EMPOWERING LIVES, INSPIRING CHANGE")}
          </Text>
          <Text align="justify">
            {translate(
              "Our mission at GAU is to create lasting, positive change in the world. We are dedicated to empowering individuals and communities by providing support and fostering hope. Through our collaborative efforts, we strive to address pressing social, environmental, and economic challenges"
            )}
            .
          </Text>
          <Group>
            <Button
              label={"Join Us"}
              primary={true}
              onClick={() => navigate(routeNames.general.signup)}
            />
            <Button
              label={"Sign In"}
              primary={true}
              style={{
                backgroundColor: "transparent",
                color: "white",
                borderColor: "white",
              }}
              variant="outline"
              onClick={() => navigate(routeNames.general.login)}
            />
          </Group>
          <Flex justify={"space-around"} gap={"lg"}>
            <Card icon={"people2"} label={"Users"} value={"+3600"} />
            <Card icon={"globe"} label={"Cases"} value={"+12000"} />
            <Card icon={"branch2"} label={"Branches"} value={"+14"} />
          </Flex>
        </Stack>
      </Grid.Col>
      {isWeb && (
        <Grid.Col lg={4}>
          <img src={img1} width={"100%"} />
        </Grid.Col>
      )}
    </Grid>
  );
};
export default Home;
