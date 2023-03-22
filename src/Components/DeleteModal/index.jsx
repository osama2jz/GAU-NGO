import {
  createStyles,
  Group,
  Modal as ModalMantine,
  Text,
  Container,
} from "@mantine/core";
import Button from "../Button";
import cross from "../../assets/cross.svg";

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
}) => {
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
          {label}
        </Text>
        <Text align="center">{message}</Text>
        <Group pt={"sm"} ml={"auto"}>
          <Button label="Cancel" onClick={onCancel} compact={true} />
          <Button
            label="Delete"
            loading={loading}
            onClick={onDelete}
            primary={true}
            compact={true}
          />
        </Group>
      </Container>
    </ModalMantine>
  );
};
export default DeleteModal;
