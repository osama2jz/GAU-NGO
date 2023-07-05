import {
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import img from "../../../assets/AboutUS.png";
import { useStyles } from "../styles";
import Projects from "./Projects";
import { useMediaQuery } from "@mantine/hooks";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const About = () => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 1020px)");
  return (
    <Container className={classes.about} fluid>
      <Title align="center">{translate("About GAU")}</Title>
      <Text align="center">
        {translate(
          "We are the dedicated team of people who are passionate about making a positive impact on the lives of those in need."
        )}
      </Text>
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
        w={isMobile ? "95%" : "80%"}
        spacing={"xl"}
        style={{ marginInline: "auto", marginBlock: "20px" }}
      >
        <img src={img} width={"80%"}/>
        <Stack justify="center">
          <Title>{translate("Help Is Our Main goal")}</Title>
          <Text align="justify">
            {translate(
              "Our organization was founded on the belief that every person deserves the opportunity to prosper and live a fulfilling life. Through our tireless efforts, we aim to address pressing social issues and provide essential support to vulnerable communities. By fostering a culture of compassion, empathy, and collaboration, we strive to create lasting change and empower people to overcome obstacles. Together, we are committed to building a brighter future, one act of kindness at a time. Join us on our mission and together let's make a difference that really matters."
            )}
          </Text>
        </Stack>
      </SimpleGrid>
      <Projects />
    </Container>
  );
};
export default About;
