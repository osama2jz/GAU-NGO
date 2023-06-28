import { Container, Flex, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import education from "../../../assets/education.svg";
import food from "../../../assets/food.svg";
import funding from "../../../assets/funding.svg";
import health from "../../../assets/health.svg";
import shelter from "../../../assets/shelter.svg";
import surgery from "../../../assets/surgery.svg";
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
          { minWidth: "md", cols: 2 },
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
            <img src={education} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                {translate("Education")}
              </Text>
              <Text>
                {translate(
                  "GAU is committed to providing quality education and improving access to education for underprivileged children and marginalized communities."
                )}
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={surgery} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                {translate("Surgery")}
              </Text>
              <Text>
                {translate(
                  "The organization recognizes that access to quality surgical care is essential for improving health outcomes and enhancing the overall well-being of individuals."
                )}
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={health} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                {translate("Health")}
              </Text>
              <Text>
                {translate(
                  "GAU believes in the power of health education and awareness in preventing diseases and promoting healthy lifestyles."
                )}
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={food} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                {translate("Food")}
              </Text>
              <Text>
                {translate(
                  "GAU recognizes that access to nutritious food is a basic human right and plays a crucial role in promoting health and well-being"
                )}
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={shelter} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                {translate("Shelter")}
              </Text>
              <Text>
                {translate(
                  "We believe that everyone deserves a place to call home and strives to provide not only shelter but also the necessary support to help individuals overcome homelessness."
                )}
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={funding} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                {translate("Funding")}
              </Text>
              <Text>
                {translate(
                  "The organization actively seeks funding from various sources to ensure the sustainability and effectiveness of its programs."
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
