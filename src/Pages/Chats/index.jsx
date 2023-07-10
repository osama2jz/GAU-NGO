import { Box, Container, Stack, Text, Flex, Avatar } from "@mantine/core";
import React from "react";
import Button from "../../Components/Button";
import ContainerHeader from "../../Components/ContainerHeader";
import InputField from "../../Components/InputField";
import ChatHeads from "./ChatHeads";
import { useStyles } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useState } from "react";
import { Send, UserCircle } from "tabler-icons-react";
import Chat from "./Chat";
import NewChat from "./NewChat";

const Chats = () => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const [opened, setOpened] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  return (
    <Box className={classes.chatsMain}>
      <ContainerHeader label={"Chats"} />
      <Container fluid className={classes.subChat}>
        <Stack className={classes.chats}>
          <Button
            label={"Start Chat"}
            leftIcon={"plus"}
            bg={true}
            onClick={() => setOpened(true)}
          />
          <InputField placeholder={"Search in chat"} leftIcon={"search"} />
          <ChatHeads isActive={true} onClick={() => setActiveChat("1")} />
          <ChatHeads onClick={() => setActiveChat("2")} />
          <ChatHeads onClick={() => setActiveChat("3")} />
          <ChatHeads onClick={() => setActiveChat("4")} />
        </Stack>
        {true ? (
          <Container fluid className={classes.chat}>
            <Flex className={classes.chatInfo}>
              <Avatar src={UserCircle} size={"lg"} radius={"50%"} />
              <Box>
                <Text fw="bold">Muhammad Usama </Text>
                <Text fz="sm">Social Worker</Text>
              </Box>
            </Flex>
            <Chat type={"sent"} />
            <Chat type="received" />
            <InputField
              placeholder={"Type a message here..."}
              rightSection={<Send color="green" cursor={"pointer"} />}
              style={{ marginTop: "auto" }}
            />
          </Container>
        ) : (
          <Container fluid className={classes.noChat}>
            <Text fw={"bolder"}>
              {translate("Open any chat to send a message")}
            </Text>
            <Text>
              {translate(
                "Send and recevie messages from other users and professionals"
              )}
            </Text>
          </Container>
        )}
      </Container>
      <NewChat opened={opened} setOpened={setOpened} />
    </Box>
  );
};

export default Chats;
