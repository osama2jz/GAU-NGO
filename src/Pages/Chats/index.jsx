import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Avatar,
  Image,
} from "@mantine/core";
import React, { useEffect } from "react";
import Button from "../../Components/Button";
import ContainerHeader from "../../Components/ContainerHeader";
import InputField from "../../Components/InputField";
import ChatHeads from "./ChatHeads";
import { useStyles } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useState } from "react";
import { ArrowNarrowLeft, Send, UserCircle } from "tabler-icons-react";
import Chat from "./Chat";
import chatImage from "../../assets/chat.svg";
import NewChat from "./NewChat";
import { useMediaQuery } from "@mantine/hooks";

const Chats = () => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 820px)");
  const [opened, setOpened] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [showChat, setshowChat] = useState(false);
  const [showChatHeads, setShowChatHeads] = useState(true);
  useEffect(() => {
    if (!isMobile) {
      setShowChatHeads(true);
    }
  }, [isMobile]);
  return (
    <Box className={classes.chatsMain}>
      <ContainerHeader label={"Chats"} />
      <Container fluid className={classes.subChat}>
        {showChatHeads ? (
          <>
            <Stack className={classes.chats}>
              <Button
                label={"Start Chat"}
                leftIcon={"plus"}
                bg={true}
                onClick={() => setOpened(true)}
              />
              <InputField placeholder={"Search in chat"} leftIcon={"search"} />
              <ChatHeads onClick={() => setActiveChat("1")} />
              <ChatHeads
                isActive={activeChat === "2" && true}
                onClick={() => {
                  setActiveChat("2");
                  setshowChat(true);
                  isMobile && setShowChatHeads(false);
                }}
              />
              <ChatHeads onClick={() => setActiveChat("3")} />
              <ChatHeads onClick={() => setActiveChat("4")} />
            </Stack>
            {!isMobile && (
              <>
                {activeChat ? (
                  <Container fluid className={classes.chat}>
                    <Flex className={classes.chatInfo}>
                      <Avatar src={UserCircle} size={"lg"} radius={"50%"} />
                      <Box>
                        <Text fw="bold">Muhammad Usama </Text>
                        <Text fz="sm">Social Worker</Text>
                      </Box>
                    </Flex>
                    <Box style={{ marginTop: "auto" }}>
                      <Chat type={"sent"} />
                      <Chat type="received" />
                      <InputField
                        placeholder={"Type a message here..."}
                        rightSection={<Send color="green" cursor={"pointer"} />}
                      />
                    </Box>
                  </Container>
                ) : (
                  <Container fluid className={classes.noChat}>
                    <img src={chatImage} width="150px" />
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
              </>
            )}
          </>
        ) : (
          isMobile &&
          showChat && (
            <Container fluid className={classes.chat}>
              <Flex onClick={() => setShowChatHeads(true)}>
                <ArrowNarrowLeft /> Back
              </Flex>
              <Flex className={classes.chatInfo}>
                <Avatar src={UserCircle} size={"lg"} radius={"50%"} />
                <Box>
                  <Text fw="bold">Muhammad Usama </Text>
                  <Text fz="sm">Social Worker</Text>
                </Box>
              </Flex>
              <Box style={{ marginTop: "auto" }}>
                <Chat type={"sent"} />
                <Chat type="received" />
                <InputField
                  placeholder={"Type a message here..."}
                  rightSection={<Send color="green" cursor={"pointer"} />}
                />
              </Box>
            </Container>
          )
        )}
      </Container>
      <NewChat opened={opened} setOpened={setOpened} />
    </Box>
  );
};

export default Chats;
