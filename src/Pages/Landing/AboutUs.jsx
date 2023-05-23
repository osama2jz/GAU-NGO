import { Container, Flex, SimpleGrid, Text, Title } from "@mantine/core";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { LandingHeader } from "../../Components/LandingHeader";
import { useStyles } from "./styles";
import Button from "../../Components/Button";
import { Category } from "./Category";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Location, Mail, MapPin, Phone, Pin } from "tabler-icons-react";

export const AboutUs = () => {
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 820px)");
  const { classes } = useStyles();
  return (
    <Container p={0} style={{ overflowX: "hidden", maxWidth: "100vw" }} fluid>
      <LandingHeader />
      <Container fluid className={classes.g2}>
        <Flex direction={"column"} w={isMobile ? "100%" : "50%"}>
          <Title order={2} align="center">
            {translate("About Us")}
          </Title>
          <Text align="justify">
            {translate(
              "We are dedicated to improving lives and solving problems. Through our innovative programs and partnerships, we empower people and communities to create a better future. Whether it’s health, education, environment, or human rights, we tackle the issues that matter most."
            )}
          </Text>
          <Flex direction={"column"} gap="sm" align={"center"} mt={"md"}>
            <Title order={3}>{translate("Contact Us")}</Title>
            <Text
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Mail /> gau@gmail.com
            </Text>
            <Text
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Phone />
              +86-432-423443
            </Text>
            <Text
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <MapPin /> Times Square, NewYork, USA
            </Text>
          </Flex>
        </Flex>
        <SimpleGrid cols={2}>
          <Category
            mt={"20px"}
            icon="cat1"
            value={"Looking for Shelter"}
            text={"We present you a proposal and discuss niffty-gritty like"}
          />
          <Category
            icon="cat2"
            value={"Financial Support"}
            text={"Protocols apart from aengage models, pricing billing"}
          />
          <Category
            mt={"20px"}
            icon="cat3"
            value={"Help in Education"}
            text={"Communication protocols apart from engagement models"}
          />
          <Category
            icon="cat4"
            value={"Medical Aid"}
            text={"Protocols apart from aengage models, pricing billing"}
          />
        </SimpleGrid>
      </Container>
    </Container>
  );
};
