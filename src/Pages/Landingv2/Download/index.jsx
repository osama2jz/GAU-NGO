import { Box, Container, Flex, Group, Text, Title } from "@mantine/core";
import React from "react";
import { useStyles } from "../styles";
import { BrandApple, BrandGooglePlay } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
const Download = () => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 1020px)");
  return (
    <Box className={classes.download}>
      <Title align="center" order={isMobile ? 2 : 1}>
        {translate("Download Our Latest App")}
      </Title>
      <Text align="center" w={isMobile ? "90%" : "50%"}>
        {translate(
          "Stay connected with GAU NGO and access our services conveniently with our latest mobile app. Whether you're a volunteer, donor, or someone in need of assistance, our app is designed to provide a seamless and user-friendly experience."
        )}
      </Text>
      <Group position="center">
        <Flex className={classes.storeButton} gap={"lg"}>
          <BrandApple fill="white" size={"50px"} />
          <Text>
            {translate("Available on the")} <br />
            <b>{translate("App Store")}</b>
          </Text>
        </Flex>
        <Flex className={classes.storeButton} gap={"lg"}>
          <BrandGooglePlay size={"50px"} />
          <Text>
            {translate("Available on the")} <br />
            <b>{translate("Play Store")}</b>
          </Text>
        </Flex>
      </Group>
    </Box>
  );
};

export default Download;
