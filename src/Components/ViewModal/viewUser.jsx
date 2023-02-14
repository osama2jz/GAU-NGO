import { Modal as ModalMantine } from "@mantine/core";

const ViewModal = ({ opened, setOpened, children, title, size="md" }) => {
  return (
    <ModalMantine
      title={title}
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      size={size}
    >
      {children}
    </ModalMantine>
  );
};
export default ViewModal;
