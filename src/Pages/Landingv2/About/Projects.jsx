import { Box, SimpleGrid, Text } from "@mantine/core";
import React, { useContext, useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import PatternIcon from "../../../assets/icons/Group-1.svg";
import PeopleIcon from "../../../assets/icons/Group-2.svg";
import LaptopIcon from "../../../assets/icons/Group-3.svg";
import GroupIcon from "../../../assets/icons/Group.svg";
import { UserContext } from "../../../contexts/UserContext";
import { useStyles } from "../styles";

const Projects = () => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const [count, setCount] = useState(false);
  return (
    <ScrollTrigger
      onEnter={() => setCount(true)}
      onExit={() => setCount(false)}
    >
      <SimpleGrid
        breakpoints={[
          { minWidth: "xs", cols: 1 },
          { minWidth: "sm", cols: 2 },
          { minWidth: "lg", cols: 4 },
        ]}
        className={classes.projects}
      >
        <Box className={classes.projectsDiv}>
          <img src={GroupIcon} />
          {count && (
            <CountUp
              start={0}
              end={1}
              duration={2}
              style={{ fontSize: "60px", fontWeight: 1000 }}
            />
          )}
          <Text size={"xl"}>{translate("Years of Operations")}</Text>
          <Text size={"xs"} align="center">
            {translate(
              "GAU has been operating for several years, working tirelessly to provide aid and support to communities in need."
            )}
          </Text>
        </Box>
        <Box className={classes.projectsDiv}>
          <img src={PatternIcon} />
          {count && (
            <CountUp
              start={0}
              end={80}
              duration={2}
              style={{ fontSize: "60px", fontWeight: 1000 }}
            />
          )}
          <Text size={"xl"}>{translate("Completed Projects")}</Text>
          <Text size={"xs"} align="center">
            {translate(
              "Our portfolio reflects its commitment to making a positive impact on the lives of individuals and communities."
            )}
          </Text>
        </Box>
        <Box className={classes.projectsDiv}>
          <img src={PeopleIcon} />
          {count && (
            <CountUp
              start={0}
              end={3600}
              duration={2}
              style={{ fontSize: "60px", fontWeight: 1000 }}
            />
          )}
          <Text size={"xl"}>{translate("Loyal Clients")}</Text>
          <Text size={"xs"} align="center">
            {translate(
              "GAU recognizes the importance of its loyal customers and strives to build strong and long-lasting relationships with them."
            )}
          </Text>
        </Box>
        <Box className={classes.projectsDiv}>
          <img src={LaptopIcon} />
          {count && (
            <CountUp
              start={0}
              end={150}
              duration={2}
              style={{ fontSize: "60px", fontWeight: 1000 }}
            />
          )}
          <Text size={"xl"}>{translate("New Projects")}</Text>
          <Text size={"xs"} align="center">
            {translate(
              "We as a community are excited to announce our new projects that aim to make a positive impact in the community."
            )}
          </Text>
        </Box>
      </SimpleGrid>
    </ScrollTrigger>
  );
};

export default Projects;
