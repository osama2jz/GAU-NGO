import { Group, Container, Modal } from "@mantine/core";
import Button from "../Button";
import TextArea from "../TextArea";

const ReferModal = ({
  opened,
  setOpened,
  onCancel,
  onDone,
  label,
  message,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title="Refer User"
    >
      <Container>
        <TextArea
          label={"Add comment"}
          placeholder="Write comment about user"
        />
        <Group pt={"sm"} position="right">
          <Button label="Cancel" onClick={() => setOpened(false)} />
          <Button label="Done" onClick={onDone} primary={true} />
        </Group>
      </Container>
    </Modal>
  );
};
export default ReferModal;
