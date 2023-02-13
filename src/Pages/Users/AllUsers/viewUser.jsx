import { Modal as ModalMantine } from "@mantine/core";

const ViewModal = ({ opened, setOpened, children, title }) => {
 return (
  <ModalMantine title={title} opened={opened} onClose={() => setOpened(false)} centered>
   {children}
  </ModalMantine>
 );
};
export default ViewModal;
