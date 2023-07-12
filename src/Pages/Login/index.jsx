import { Container, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import imgg from "../../assets/login.png";
import logo from "../../logo.svg";
import { useStyles } from "./styles";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import routeNames from "../../Routes/routeNames";

const Auth = () => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const matches = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();

  const allowed = () => {
    if (user?.role && user?.verificationStatus !== "unverified") {
      navigate(routeNames.socialWorker.dashboard);
    } else {
      return true;
    }
  };

  return (
    <Container
      className={classes.container}
      size="xl"
      p={"0px"}
      m="0px"
      maw={"100%"}
    >
      <Container
        w={matches ? "50%" : "100%"}
        size="xl"
        p={"0px"}
        m="0px"
        className={classes.formC}
      >
        <Group pt={"xl"} pl="xl">
          <img src={logo} width="50px" />
          <Text fz="30px" fw="bolder">
            GAU
          </Text>
        </Group>
        {allowed() && <Outlet />}
      </Container>
      {matches && (
        <Container
          w={"50%"}
          bg={"rgb(225, 245, 250, 0.6)"}
          size="xl"
          p={"0px"}
          m="0px"
          className={classes.img}
        >
          <img src={imgg} width="60%" />
        </Container>
      )}
    </Container>
  );
};

export default Auth;
