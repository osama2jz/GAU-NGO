import { Group, Container, Modal } from "@mantine/core";
import Button from "../Button";
import InputField from "../InputField";
import TextArea from "../TextArea";

const ReferNewCaseModal = ({
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
      title="Refer with new case"
    >
      <Container>
        <InputField label={"Add New Case"} placeholder="Enter new case name" />
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
export default ReferNewCaseModal;
