import { Container, createStyles, Group, Modal, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import Button from "../../../Components/Button";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";

const LeaveModal = ({ opened, setOpened, onSubmit }) => {
  const useStyles = createStyles((theme) => ({
    title: {
      margin: "auto",
      fontSize: "25px",
      fontWeight: "bold",
      color: "#5C5F66",
      // marginLeft:"150px"
    },
    root: {},
  }));
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);

  return (
    <Modal
      title={translate("Schedule")}
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      radius="lg"
      classNames={{ title: classes.title, body: classes.root }}
    >
      <Container>
        <Text>{translate("Are you sure you want to schedule this appointment?")}</Text>
        <Group position="right" mt={"xl"}>
          <Button label={"No"} w="100px" onClick={() => setOpened(false)} />
          <Button
            label={"Yes"}
            primary={true}
            w="100px"
            onClick={() => {
              onSubmit.mutate();
            }}
            loading={onSubmit.isLoading}
          />
        </Group>
      </Container>
    </Modal>
  );
};

export default LeaveModal;
