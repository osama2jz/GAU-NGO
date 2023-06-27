import {
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import img from "../../../assets/about.png";
import Button from "../../../components/Button";
import img1 from "../../../assets/cat4.svg";
import { useStyles } from "../styles";
import Projects from "./Projects";
import { useMediaQuery } from "@mantine/hooks";

const About = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 1020px)");
  return (
    <Container className={classes.about} fluid>
      <Title align="center">About GAU</Title>
      <Text align="center">
        We are the dedicated team of people who are passionate about making a
        positive impact on the lives of those in need.
      </Text>
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
        w={isMobile ? "95%" : "70%"}
        spacing={"xl"}
        style={{ margin: "auto" }}
      >
        <img src={img} width={"100%"} />
        <Stack justify="center">
          <Title>Help Is Our Main goal</Title>
          <Text align="justify">
            Our organization was founded on the belief that every person
            deserves the opportunity to prosper and live a fulfilling life .
            Through our tireless efforts, we aim to address pressing social
            issues and provide essential support to vulnerable communities. By
            fostering a culture of compassion, empathy, and collaboration, we
            strive to create lasting change and empower people to overcome
            obstacles. Together, we are committed to building a brighter future,
            one act of kindness at a time. Join us on our mission and together
            let's make a difference that really matters .
          </Text>
          {/* <Group>
            <Button label={"Download"} />
            <Button label={"Learn More"} variant="outline" />
          </Group> */}
        </Stack>
      </SimpleGrid>
      <Projects />
      {/* <SimpleGrid
        className={classes.about2}
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          //   { minWidth: "md", cols: 2 },
          { minWidth: "lg", cols: 3 },
        ]}
      >
        <Stack align="center" p={"20px"}>
          <img src={img1} width={"100px"} />
          <Title>5 Years Of Operation</Title>
          <Text align="center">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour
          </Text>
        </Stack>
        <Stack align="center" p={"20px"}>
          <img src={img1} width={"100px"} />
          <Title>Easy To Custom</Title>
          <Text align="center">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour
          </Text>
        </Stack>
        <Stack align="center" p={"20px"}>
          <img src={img1} width={"100px"} />
          <Title>Easy To Custom</Title>
          <Text align="center">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour
          </Text>
        </Stack>
      </SimpleGrid> */}
    </Container>
  );
};
export default About;
