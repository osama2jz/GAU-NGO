import { Group, Modal, Tabs } from "@mantine/core";
import React from "react";
import InputField from "../../Components/InputField";
import SelectMenu from "../../Components/SelectMenu";
import ChatHeads from "./ChatHeads";
import { useStyles } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const NewChat = ({ opened, setOpened }) => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="New Chat"
      size={"lg"}
      //   style={{ height: "50vh" }}
    >
      <Tabs
        variant="pills"
        color={"blue.0"}
        defaultValue={"1"}
        classNames={{
          tab: classes.tabs,
        }}
      >
        <Tabs.List grow>
          {user.role !== "user" && <Tabs.Tab value="5">Admin</Tabs.Tab>}
          <Tabs.Tab value="1">Social Worker</Tabs.Tab>
          <Tabs.Tab value="2">Psychologist</Tabs.Tab>
          <Tabs.Tab value="3">Lawyer</Tabs.Tab>
          {user.role !== "user" && <Tabs.Tab value="4">User</Tabs.Tab>}
        </Tabs.List>
        <InputField
          leftIcon={"search"}
          placeholder={"Search user here"}
          pb="0px"
          my="sm"
        />
        <Tabs.Panel value="1">
          <ChatHeads showTime={false} />
          <ChatHeads showTime={false} />
          <ChatHeads showTime={false} />
          <ChatHeads showTime={false} />
          <ChatHeads showTime={false} />
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};

export default NewChat;
