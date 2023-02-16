import { createStyles, Modal as ModalMantine } from "@mantine/core";

const EditModal = ({ opened, setOpened, children, title, size="md" }) => {
  const useStyles = createStyles((theme) => ({
    title:{
      // size: "50px",
      fontSize: "25px",
      fontWeight: "bold",
      color:"#5C5F66",
      textAlign:"center"
    }
  }));
  const {classes}=useStyles()
  return (
    <ModalMantine
      title={title}
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      // size={size}
      size={"500px"}
      classNames={{title:classes.title}}
    >
      {children}
    </ModalMantine>
  );
};

export default EditModal;