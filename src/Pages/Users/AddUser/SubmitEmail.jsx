import { Anchor, Modal, Text, Container } from "@mantine/core";
import { ArrowNarrowRight } from "tabler-icons-react";
import verifyEmail from "../../../assets/verifyEmail.svg";
import { useStyles } from "./styles";

const SubmitModal = ({ opened, setOpened }) => {
  const { classes } = useStyles();
  return (
    <>
      <Modal
        opened={opened}
        centered
        withCloseButton={false}
      >
        <Container className={classes.modal}>
          <img src={verifyEmail} alt="icon" />
          <Text fw={"bold"}>Verify your email Address </Text>
          <Text>
            To confirm your email address, <b>please click on the link</b> in
            the email we sent you.
          </Text>
          <Anchor>Resend Email</Anchor>
          {/* <br /> */}
          <Anchor variant={"text"} className={classes.skip}>
            Skip{" "}
            <ArrowNarrowRight size={20} strokeWidth={0.5} color={"#000000"} />
          </Anchor>
        </Container>
      </Modal>
    </>
  );
};
export default SubmitModal;
