import { Avatar, Box, Flex, Stack, Text } from "@mantine/core";
import React from "react";
import { UserCircle } from "tabler-icons-react";
import { useStyles } from "./styles";

const ChatHeads = ({
  isActive,
  avatar,
  name,
  type,
  time,
  onClick,
  showTime = true,
}) => {
  const { classes } = useStyles({ isActive });
  return (
    <Flex gap={"sm"} className={classes.chatHead} pr="xs" onClick={onClick}>
      <Avatar src={UserCircle} size={"lg"} radius={"50%"} />
      <Box>
        <Text fw="bold">Muhammad Usama </Text>
        <Text fz="sm">Social Worker</Text>
      </Box>
      {showTime && (
        <Text ml="auto" fz="xs">
          12:59pm
        </Text>
      )}
    </Flex>
  );
};

export default ChatHeads;
