import { createStyles, Modal as ModalMantine } from "@mantine/core";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

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
  const {translate}=useContext(UserContext)
  const {classes}=useStyles()
  return (
    <ModalMantine
      title={translate(title)}
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