import { Avatar, Box, Flex, Text } from "@mantine/core";
import React from "react";
import { UserCircle } from "tabler-icons-react";
import { useStyles } from "./styles";

const Chat = ({ type }) => {
  const { classes } = useStyles({ type });
  return (
    <Box className={classes.messageMain}>
      <Avatar src={UserCircle} size={"md"} radius={"50%"} />
      <Box className={classes.message}>
        <Text>This is some messages</Text>
        <Flex justify={"space-between"}>
          <Text fz="xs" opacity={"0.5"}>
            Today
          </Text>
          <Text fz="xs" opacity={"0.5"}>
            12:30pm
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Chat;
