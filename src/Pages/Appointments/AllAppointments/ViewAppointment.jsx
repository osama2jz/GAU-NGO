import {
  Group,
  Modal as ModalMantine,
  Container,
} from "@mantine/core";
import Button from "../../../Components/Button";

const ViewAppointment = ({ opened, setOpened }) => {
  return (
    <ModalMantine
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      centered
    >
      <Container>
      <Group pt={"sm"} ml={"auto"}>
          {/* <Button label="Cancel" compact={true} /> */}
          <Button
            label="Verify"
            primary={true}
            compact={true}
          />
        </Group>
      </Container>
    </ModalMantine>
  );
};
export default ViewAppointment;
