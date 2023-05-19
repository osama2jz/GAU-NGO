import { Container, Text } from "@mantine/core";
import React from "react";
import { useStyles } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const TopBox = ({ icon, value, text, color }) => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  return (
    <Container className={classes.box}>
      <img
        src={new URL(`../../assets/${icon}.svg`, import.meta.url).href}
        width={"50px"}
      />
      <Text fw={"bold"} color={color}>
        {value}
      </Text>
      <Text color={color}>{translate(text)}</Text>
    </Container>
  );
};
