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

const Services = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 1020px)");
  return (
    <Container fluid className={classes.services}>
      <Title align="center">Our Services</Title>
      <Text align="center" w={isMobile ? "90%" : "50%"}>
        Build a network of compassion, resilience, and sustainable solutions to
        improve vulnerable communities and promote lasting positive change.
        Dedicated to empowering people, closing gaps, and building a world where
        everyone has an equal opportunity to prosper.
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
              Our organization is driven by a commitment to break down barriers,
              fight discrimination and improve the lives of Roma individuals and
              families. With a deep understanding of your unique challenges and
              cultural heritage, we offer a range of services tailored to your
              specific needs.
            </Text>
          </Stack>
        )}
        <Container className={classes.servicesSub}>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={education} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                Education
              </Text>
              <Text>
                GAU is committed to providing quality education and improving
                access to education for underprivileged children and
                marginalized communities.
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={surgery} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                Surgery
              </Text>
              <Text>
                The organization recognizes that access to quality surgical care
                is essential for improving health outcomes and enhancing the
                overall well-being of individuals.
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={health} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                Health
              </Text>
              <Text>
                There are many variations of passages of Lorem Ipsum
                available,but the majorityhave suffered alteration in some form,
                by injected humour,available
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={food} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                Food
              </Text>
              <Text>
                There are many variations of passages of Lorem Ipsum
                available,but the majorityhave suffered alteration in some form,
                by injected humour,available
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={shelter} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                Shelter
              </Text>
              <Text>
                There are many variations of passages of Lorem Ipsum
                available,but the majorityhave suffered alteration in some form,
                by injected humour,available
              </Text>
            </Stack>
          </Flex>
          <Flex gap={"xl"} className={classes.cat}>
            <img src={funding} height={"100%"} />
            <Stack spacing={"0px"}>
              <Text fw={"bold"} fz="lg">
                Funding
              </Text>
              <Text>
                There are many variations of passages of Lorem Ipsum
                available,but the majorityhave suffered alteration in some form,
                by injected humour,available
              </Text>
            </Stack>
          </Flex>
        </Container>
      </SimpleGrid>
    </Container>
  );
};

export default Services;
