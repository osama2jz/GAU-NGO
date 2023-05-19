import { Container, Text } from "@mantine/core";
import React from "react";
import { useStyles } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useMediaQuery } from "@mantine/hooks";

export const Category = ({ icon, value, text, color, mt }) => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 820px)");
  return (
    <Container className={classes.cat} mt={mt}>
      <img
        src={new URL(`../../assets/${icon}.svg`, import.meta.url).href}
        width={isMobile ? "60px" : "100px"}
      />
      <Text fw={"bold"} color={color} fz={isMobile?'12px':'16px'}>
        {value}
      </Text>
      <Text color={color} align="center" fz="12px">
        {translate(text)}
      </Text>
    </Container>
  );
};
