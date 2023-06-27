import { Box, Container, Flex, Group, Text, Title } from "@mantine/core";
import React from "react";
import { useStyles } from "../styles";
import { BrandApple, BrandGooglePlay } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
const Download = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 1020px)");
  return (
    <Box className={classes.download}>
      <Title align="center" order={isMobile ? 2 : 1}>
        Download Our Latest App
      </Title>
      <Text align="center" w={isMobile ? "90%" : "50%"}>
        There are many variations of passages of Lorem Ipsum available, but the
        majorityhave suffered alteration in some form, by injected
        humour,available
      </Text>
      <Group position="center">
        <Flex className={classes.storeButton} gap={"lg"}>
          <BrandApple fill="white" size={"50px"} />
          <Text>
            Available on the <br />
            <b>App Store</b>
          </Text>
        </Flex>
        <Flex className={classes.storeButton} gap={"lg"}>
          <BrandGooglePlay size={"50px"} />
          <Text>
            Available on the <br />
            <b>Play Store</b>
          </Text>
        </Flex>
      </Group>
    </Box>
  );
};

export default Download;
