import { createStyles, Modal as ModalMantine } from "@mantine/core";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const ViewModal = ({ opened, setOpened, children, title, size = "500px" }) => {
  const useStyles = createStyles((theme) => ({
    title: {
      margin: "auto",
      fontSize: "25px",
      fontWeight: "bold",
      color: "#5C5F66",
      // marginLeft:"150px"
    },
    root:{
    
    }
  }));
  const { classes } = useStyles();
  const {translate}=useContext(UserContext)
  return (
    <ModalMantine
      title={translate(title)}
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      size={size}
      radius="lg"
      classNames={{ title: classes.title, body: classes.root }}
    >
      {children}
    </ModalMantine>
  );
};

export default ViewModal;
