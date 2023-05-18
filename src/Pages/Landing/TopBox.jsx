import { Container, Text } from "@mantine/core";
import React from "react";
import { useStyles } from "./styles";

export const TopBox = ({ icon, value, text, color }) => {
  const { classes } = useStyles();
  return (
    <Container className={classes.box}>
      <img src={new URL(`../../assets/${icon}.svg`, import.meta.url).href} width={"50px"}/>
      <Text fw={"bold"} color={color}>{value}</Text>
      <Text color={color}>{text}</Text>
    </Container>
  );
};
