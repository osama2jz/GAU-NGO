import { Badge, Container, Text } from "@mantine/core";
import React from "react";
import { useStyles } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useMediaQuery } from "@mantine/hooks";

export const Service = ({ image, title, location, tag }) => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 820px)");
  return (
    <Container className={classes.service}>
      <img
        src={new URL(`../../assets/${image}.jpg`, import.meta.url).href}
        width={isMobile ? "60px" : "350px"}
      />
      <Badge size="lg" variant="filled" className={classes.tag}>{tag}</Badge>
      <Text fw={"bold"} fz={isMobile ? "12px" : "16px"}>
        {title}
      </Text>
      <Text fz="12px" color="gray">
        {translate(location)}
      </Text>
    </Container>
  );
};
