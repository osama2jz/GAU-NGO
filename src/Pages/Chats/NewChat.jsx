import { Group, Modal } from "@mantine/core";
import React from "react";
import InputField from "../../Components/InputField";
import SelectMenu from "../../Components/SelectMenu";
import ChatHeads from "./ChatHeads";

const NewChat = ({ opened, setOpened }) => {
  const filters = [
    { label: "All", value: "all" },
    { label: "Social Worker", value: "socialWorker" },
    { label: "Psychologist", value: "psychologist" },
    { label: "Lawyer", value: "lawyer" },
  ];
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="New Chat"
      size={"lg"}
    >
      <Group mb="lg">
        <InputField
          leftIcon={"search"}
          placeholder={"Search user here"}
          pb="0px"
          w="65%"
        />
        <SelectMenu data={filters} w="30%" value={"all"} />
      </Group>
      <ChatHeads showTime={false} />
      <ChatHeads showTime={false} />
      <ChatHeads showTime={false} />
      <ChatHeads showTime={false} />
      <ChatHeads showTime={false} />
    </Modal>
  );
};

export default NewChat;
