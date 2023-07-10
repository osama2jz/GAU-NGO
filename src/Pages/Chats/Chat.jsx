import { Avatar, Box, Flex, Text } from "@mantine/core";
import React from "react";
import { UserCircle } from "tabler-icons-react";
import { useStyles } from "./styles";
import { useMediaQuery } from "@mantine/hooks";

const Chat = ({ type }) => {
  const { classes } = useStyles({ type });
  const isMobile = useMediaQuery("(max-width: 820px)");
  return (
    <Box className={classes.messageMain}>
      <Avatar src={UserCircle} size={"md"} radius={"50%"} />
      <Box className={classes.message}>
        <Text fz={isMobile ? "13px" : "md"}>This is some messages</Text>
        <Flex justify={"space-between"}>
          <Text fz={isMobile ? "10px" : "xs"} opacity={"0.5"}>
            Today
          </Text>
          <Text fz={isMobile ? "10px" : "xs"} opacity={"0.5"}>
            12:30pm
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Chat;
