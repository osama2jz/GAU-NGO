import {
  Container,
  Flex,
  SimpleGrid,
  Text,
  Title
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useContext } from "react";
import { useNavigate } from "react-router";
import Button from "../../Components/Button";
import { LandingHeader } from "../../Components/LandingHeader";
import routeNames from "../../Routes/routeNames";
import landingFG from "../../assets/landingFG.svg";
import mem from "../../assets/mem.svg";
import { UserContext } from "../../contexts/UserContext";
import { Category } from "./Category";
import { LandingFooter } from "./LandingFooter";
import { Service } from "./Service";
import { TopBox } from "./TopBox";
import { useStyles } from "./styles";

const Landing = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 820px)");

  const { translate } = useContext(UserContext);
  return (
    <Container
      onClick={toggle}
      fluid
      p={0}
      style={{ overflowX: "hidden", maxWidth: "100vw" }}
    >
      <LandingHeader opened={opened} toggle={toggle} />
      <Container className={classes.top} fluid>
        <Flex
          direction={isMobile ? "column" : "row"}
          justify={"space-evenly"}
          align={"center"}
        >
          <img src={landingFG} width={isMobile ? "300px" : "450px"} />
          <Flex direction={"column"} w={isMobile ? "95%" : "40%"} gap={"md"}>
            <Title order={isMobile ? 3 : 1}>
              {translate(
                "Unleashing Potential, Igniting Hope, Transforming Lives"
              )}
            </Title>
            <Text align="justify">
              {translate(
                "Join us in our mission to build a better world, where every person has access to education, healthcare, and equal opportunities. We value transparency, accountability, and integrity in all our endeavors, ensuring that your support directly benefits those in need. Our NGO is driven by the belief that every person deserves dignity, respect, and the opportunity to thrive"
              )}
            </Text>
          </Flex>
        </Flex>
        <Flex
          justify={isMobile ? "space-between" : "center"}
          w={isMobile ? "100%" : "60%"}
          style={{ margin: "auto", marginTop: "10px" }}
        >
          <TopBox icon={"clock"} value={"50+"} text={"Cases"} color={"green"} />
          <TopBox
            icon={"people"}
            value={"1000+"}
            text={"People"}
            color={"blue"}
          />
          <TopBox icon={"globe"} value={"20+"} text={"Countries"} color="red" />
        </Flex>
      </Container>
      <Container fluid className={classes.services}>
        <Title order={2} align="center" mb="lg">
          Our Services
        </Title>
        <Flex direction={"row"} justify={"space-evenly"}>
          <Service
            image={"s1"}
            tag={"Food & Water"}
            title="Collect Fund For Water & Food"
            location={"Barcelona, Spain"}
          />
          <Service
            image={"s2"}
            tag={"Education"}
            title="Collect Fund For Education"
            location={"Barcelona, Spain"}
          />
          <Service
            image={"s3"}
            tag={"Home & Shelter"}
            title="Collect Fund For Shelter"
            location={"Barcelona, Spain"}
          />
        </Flex>
      </Container>
      <Container fluid className={classes.g2}>
        <Flex direction={"column"} w={isMobile ? "100%" : "50%"}>
          <Title order={2} align="center">
            {translate("Popular Help Categories")}
          </Title>
          <Text align="justify">
            {translate(
              "We are dedicated to improving lives and solving problems. Through our innovative programs and partnerships, we empower people and communities to create a better future. Whether it’s health, education, environment, or human rights, we tackle the issues that matter most."
            )}
          </Text>
          <Button
            label={"More About us"}
            w={"200px"}
            primary={true}
            onClick={() => navigate(routeNames.general.aboutUs)}
            styles={{ margin: "auto", marginTop: "20px" }}
          />
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
      <Container className={classes.mem} fluid>
        <Flex direction={"column"} gap={"md"} justify={"center"}>
          <Title color="blue" align={isMobile ? "center" : ""}>
            {translate("Become a member")}
          </Title>
          <Text align="justify">
            {translate(
              "Join us in our mission to build a better world, where every person has access to education, healthcare, and equal opportunities. We value transparency, accountability, and integrity in all our endeavors, ensuring that your support directly benefits those in need. Our NGO is driven by the belief that every person deserves dignity, respect, and the opportunity to thrive"
            )}
          </Text>
          <Button
            label={"Click Here to Join"}
            bg={true}
            w={"200px"}
            onClick={() => navigate(routeNames.general.signup)}
          />
        </Flex>
        {!isMobile && <img src={mem} width={"600px"} alt="image"/>}
      </Container>
      <LandingFooter />
    </Container>
  );
};
export default Landing;
