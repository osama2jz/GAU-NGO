import React from "react";
import { Container, Flex, Text } from "@mantine/core";
import logo from "../../assets/Gau.png";
import Button from "../Button";
import { useStyles } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import routeNames from "../../Routes/routeNames";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const LandingHeader = () => {
  const { classes } = useStyles();
  const { user, translate } = useContext(UserContext);

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
        <Link className={classes.link}>{translate("Home")}</Link>
        <Link className={classes.link}>{translate("Donation")}</Link>
        <Link className={classes.link}>{translate("About Us")}</Link>
        {!user.role ? (
          <>
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
          </>
        ) : (
          <Button
            onClick={() => {
              localStorage.removeItem("userData");
              window.location.reload();
            }}
            label={"Logout"}
          />
        )}
      </Flex>
    </Container>
  );
};
