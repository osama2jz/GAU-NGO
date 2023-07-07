import { Box, Container, Flex, Stack, Text } from "@mantine/core";
import React from "react";
import { useStyles } from "./styles";

const Chat = ({ type }) => {
  const { classes } = useStyles({ type });
  return (
    <Box className={classes.message}>
      <Text>This is some messages</Text>
      <Flex justify={"space-between"}>
        <Text fz="xs">Today</Text>
        <Text fz="xs">12:30pm</Text>
      </Flex>
    </Box>
  );
};

export default Chat;
