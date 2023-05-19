import React from "react";
import { Burger, Container, Flex, Text } from "@mantine/core";
import logo from "../../assets/Gau.png";
import Button from "../Button";
import { useStyles } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import routeNames from "../../Routes/routeNames";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

export const LandingHeader = ({ opened, toggle }) => {
  const isMobile = useMediaQuery("(max-width: 820px)");
  const { user, translate } = useContext(UserContext);
  const { classes } = useStyles({ opened });

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
      <Flex
        align={"center"}
        className={classes.logo}
        onClick={() => navigate(routeNames.general.landing)}
      >
        <img src={logo} width={60} />
        <Text fw={"bold"} fz={20}>
          GAU
        </Text>
      </Flex>
      {isMobile && <Burger opened={opened} onClick={toggle} />}
      <Flex gap={"md"} align={"center"} className={classes.navigationBar}>
        <Link className={classes.link}>{translate("Home")}</Link>
        {/* <Link className={classes.link}>{translate("Donation")}</Link> */}
        <Link className={classes.link}>{translate("About Us")}</Link>
        {!user?.role ? (
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
