import { Box, Text } from "@mantine/core";
import React from "react";
import { useStyles } from "../styles";
export const Card = ({ icon, label, value }) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.homeCard}>
      <img
        src={new URL(`../../../assets/${icon}.svg`, import.meta.url).href}
        width={"40px"}
      />
      <Text fw="bold">{label}</Text>
      <Text>{value}</Text>
    </Box>
  );
};
