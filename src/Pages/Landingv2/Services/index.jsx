import { Container, Flex, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import traceability from "../../../assets/traceability.png";
import security from "../../../assets/security.png";
import ngo from "../../../assets/ngo.png";
import beneficiary from "../../../assets/beneficiary.png";
import administration from "../../../assets/administration.png";
import effectivness from "../../../assets/effectiveness.png";
import { useStyles } from "../styles";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const Services = () => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 1020px)");
  return (
    <Container fluid className={classes.services}>
      <Title align="center">{translate("Our Services")}</Title>
      <Text align="center" w={isMobile ? "90%" : "50%"}>
        {translate(
          "Build a network of compassion, resilience, and sustainable solutions to improve vulnerable communities and promote lasting positive change. Dedicated to empowering people, closing gaps, and building a world where everyone has an equal opportunity to prosper."
        )}
      </Text>
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "lg", cols: 2 },
        ]}
      >
        {true && (
          <Stack style={{ margin: "auto" }} align="center">
            <video
              autoPlay
              muted
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              width={"80%"}
              height={"100%"}
              style={{ borderRadius: "10px" }}
            />
            <Text w="80%" align="center" color="gray">
              {translate(
                "Our organization is driven by a commitment to break down barriers, fight discrimination and improve the lives of Roma individuals and families. With a deep understanding of your unique challenges and cultural heritage, we offer a range of services tailored to your specific needs."
              )}
            </Text>
          </Stack>
        )}
        <Container className={classes.servicesSub}>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={effectivness} height={"100%"} width={"190px"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                {translate("EFFECTIVENESS")}
              </Text>
              <Text>
                {translate(
                  "It allows changes or updates made in the app to be instantly reflected in the system. We avoid duplication of data."
                )}
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={traceability} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                {translate("TRACEABILITY")}
              </Text>
              <Text>
                {translate(
                  "GAU APP guarantees transparency and traceability by providing a detailed record of all online interactions and services. It allows changes or updates made to the app to be instantly reflected in the system. We avoid duplication of data."
                )}
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={security} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                {translate("SECURITY")}
              </Text>
              <Text>
                {translate(
                  "We comply with applicable data protection laws and regulations. We encrypt sensitive data avoiding infringement by external agents."
                )}
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={ngo} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                {translate("NGOs")}
              </Text>
              <Text>
                {translate(
                  "We apply a rigorous protocol in all our efforts, guaranteeing transparency, traceability and high ethical standards."
                )}
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={beneficiary} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                {translate("BENEFICIARIES")}
              </Text>
              <Text>
                {translate(
                  "We offer tools, resources and opportunities to boost your personal and professional growth. We want you to feel empowered, inspired and confident to create a bright future."
                )}
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={administration} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                {translate("ADMINISTRATIONS")}
              </Text>
              <Text>
                {translate(
                  "At GAU, we are committed to promoting traceability and transparency in all our activities to ensure strong collaboration with government authorities. "
                )}
              </Text>
            </Stack>
          </Flex>
        </Container>
      </SimpleGrid>
    </Container>
  );
};

export default Services;
