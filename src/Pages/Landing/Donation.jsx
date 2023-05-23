import { Container, Flex, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import InputField from "../../Components/InputField";
import { LandingHeader } from "../../Components/LandingHeader";
import routeNames from "../../Routes/routeNames";
import donate from "../../assets/donate.jpg";
import { UserContext } from "../../contexts/UserContext";
import { LandingFooter } from "./LandingFooter";
import { useStyles } from "./styles";

export const Donation = () => {
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 820px)");
  const { classes } = useStyles();
  return (
    <Container fluid p={0} style={{ overflowX: "hidden", maxWidth: "100vw" }}>
      <LandingHeader />
      <Container fluid p={0}>
        <img src={donate} height={isMobile ? "200px" : "auto"} />

        <Flex
          direction={isMobile ? "column" : "row"}
          justify={"space-evenly"}
          mt={"50px"}
        >
          <Flex
            direction={"column"}
            w={isMobile ? "90%" : "50%"}
            style={{ margin: "auto" }}
          >
            <Title order={2} color="red" mt="lg" align="center">
              {translate("Supporting GAU")}
            </Title>
            <Text align="justify">
              {translate(
                "Welcome to our donation page, where your generous contribution can make a significant impact! By donating to our cause, you are joining a compassionate community dedicated to making a positive change in the world. Whether it's providing essential resources to those in need, supporting groundbreaking research, or empowering underprivileged communities, your donation enables us to continue our mission. Together, we can create a brighter future and bring hope to those who need it most. Every dollar counts, and your contribution, no matter the size, will go a long way in making a difference. Thank you for your kindness and generosity."
              )}
            </Text>
          </Flex>
          <Flex
            direction={"column"}
            w={isMobile ? "90%" : "30%"}
            style={{ margin: "auto" }}
          >
            <Title order={2} color="red" mt="lg" align="center">
              {translate("Donate Now")}
            </Title>
            <InputField label={"Full Name"} placeholder={"Enter your name"} />
            <InputField
              label={"Donation Amount"}
              placeholder={"Enter amount here"}
              type="number"
            />
            <Button label={"Donate"} />
          </Flex>
        </Flex>
        <Text
          w={isMobile ? "95%" : "50%"}
          style={{ margin: "auto" }}
          align="center"
          pt="md"
          pb="lg"
        >
          For more information concerning donation{" "}
          <Link to={routeNames.general.aboutUs}>contact us here</Link>
        </Text>
      </Container>
      <LandingFooter />
    </Container>
  );
};
