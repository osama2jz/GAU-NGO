import { Container, Flex, Text, Title } from "@mantine/core";
import { LandingHeader } from "../../Components/LandingHeader";
import { useStyles } from "./styles";
import landingFG from "../../assets/landingFG.svg";
import { TopBox } from "./TopBox";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Landing = () => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  return (
    <Container fluid p={0}>
      <LandingHeader />
      <Container className={classes.top} fluid>
        <Flex justify={"space-evenly"} align={"center"}>
          <img src={landingFG} width={"450px"} />
          <Flex direction={"column"} w={"40%"} gap={"md"}>
            <Title order={1}>
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
        <Flex justify={"center"} w={"60%"} style={{ margin: "auto" }}>
          <TopBox
            icon={"clock"}
            value={"50+"}
            text={"Cases"}
            color={"green"}
          />
          <TopBox
            icon={"people"}
            value={"1000+"}
            text={"People"}
            color={"blue"}
          />
          <TopBox icon={"globe"} value={"20+"} text={"Countries"} color="red" />
        </Flex>
      </Container>
    </Container>
  );
};
export default Landing;
