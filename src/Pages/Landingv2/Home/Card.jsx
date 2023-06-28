import { Box, Text } from "@mantine/core";
import React from "react";
import { useStyles } from "../styles";
import { useMediaQuery } from "@mantine/hooks";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
export const Card = ({ icon, label, value }) => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 820px)");
  return (
    <Box className={classes.homeCard}>
      <img
        src={new URL(`../../../assets/${icon}.svg`, import.meta.url).href}
        width={isMobile ? "30px" : "40px"}
      />
      <Text fw="bold">{translate(label)}</Text>
      <Text>{value}</Text>
    </Box>
  );
};
