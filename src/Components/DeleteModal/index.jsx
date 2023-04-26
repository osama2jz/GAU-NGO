import {
  createStyles,
  Group,
  Modal as ModalMantine,
  Text,
  Container,
} from "@mantine/core";
import Button from "../Button";
import cross from "../../assets/cross.svg";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const useStyles = createStyles((theme) => ({
  root: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    gap:'5px'
  },
}));

const DeleteModal = ({
  opened,
  setOpened,
  onCancel,
  onDelete,
  label,
  loading,
  message,
  close
}) => {
  const {translate}=useContext(UserContext)
  const { classes, cx } = useStyles();
  return (
    <ModalMantine
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      centered
    >
      <Container className={classes.root}>
        <img src={cross} alt="icon" width={"40px"}/>
        <Text fw={"bold"}>
          {translate(label)}
        </Text>
        <Text align="center">{translate(message)}</Text>
        <Group pt={"sm"} ml={"auto"}>
          <Button label={translate("Cancel")} onClick={onCancel}/>
          <Button
            label={close ?translate("Done"):translate("Delete")}
            loading={loading}
            onClick={onDelete}
            primary={true}
          />
        </Group>
      </Container>
    </ModalMantine>
  );
};
export default DeleteModal;
