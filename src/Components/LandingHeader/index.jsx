import React from "react";
import { Container, Flex, Text } from "@mantine/core";
import logo from "../../assets/Gau.png";
import Button from "../Button";
import { useStyles } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import routeNames from "../../Routes/routeNames";

export const LandingHeader = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <Container
      fluid
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      p={"md"}
    >
      <Flex align={"center"}>
        <img src={logo} width={60} />
        <Text fw={"bold"} fz={20}>
          GAU
        </Text>
      </Flex>
      <Flex gap={"md"} align={"center"}>
        <Link className={classes.link}>Home</Link>
        <Link className={classes.link}>Donation</Link>
        <Link className={classes.link}>About Us</Link>
        <Button
          label={"Sign up"}
          primary={true}
          onClick={() => navigate(routeNames.general.signup)}
        />
        <Button
          label={"Log in"}
          primary={true}
          onClick={() => navigate(routeNames.general.login)}
        />
      </Flex>
    </Container>
  );
};
