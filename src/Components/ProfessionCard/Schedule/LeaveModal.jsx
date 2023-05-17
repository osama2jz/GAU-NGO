import { Container, createStyles, Group, Modal, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import Button from "../../../Components/Button";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";

const LeaveModal = ({ opened, setOpened, date, branchId, userId, setRefetch,scheduledId,single,setSingle}) => {
  const useStyles = createStyles((theme) => ({
    title: {
      margin: "auto",
      fontSize: "25px",
      fontWeight: "bold",
      color: "#5C5F66",
      // marginLeft:"150px"
    },
    root: {},
  }));
  const { classes } = useStyles();
  const { user,translate } = useContext(UserContext);
  console.log("single",single)

  const handleLeave = useMutation(
    () => {
      return axios.post(
        `${backendUrl + "/api/schedule/cancel"}`,
        {
          userId: userId,
          leaveDate: date,
          type: "schedule",
          branchId: branchId,
        },
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: translate("Leave"),
            message:(translate("The date"),{date},translate("is marked as leave.")),
            color: "green.0",
          });
          setOpened(false);
          setRefetch((v) => !v);
        } else {
          showNotification({
            title:  translate("Leave"),
            message: translate(response.data.message),
            color: "red.0",
          });
        }
      },
    }
  );

  // console.log("schedule Idddd",scheduledId)
  const handleSingleSlotLeave = useMutation(
    () => {
      return axios.post(
        `${backendUrl + "/api/schedule/slotCancel"}`,
        {
          scheduleId: scheduledId,
        },
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: translate("Leave"),
            message:(translate("The date"),{date},translate("is marked as leave.")),
            color: "green.0",
          });
          setOpened(false);
          setRefetch((v) => !v);
          setSingle(false)

        } else {
          showNotification({
            title: translate("Error"),
            message: translate(response.data.message),
            color: "red.0",
          });
          setOpened(false);
        }
      },
    }
  );
  return (
    <Modal
      title={translate("Mark as Leave")}
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      radius="lg"
      classNames={{ title: classes.title, body: classes.root }}
    >
      <Container>
      <Text>
          {translate("Are you sure you want to mark")} {date} {translate("as leave?")} {translate("It will cancel all of your appointments.")}
        </Text>
        <Group position="right" mt={"xl"}>
          <Button label={"No"} w="100px" onClick={() => setOpened(false)} />
          <Button
            label={"Yes"}
            primary={true}
            w="100px"
            loading={handleLeave.isLoading}
            onClick={() => single ? handleSingleSlotLeave.mutate() :handleLeave.mutate()}
           
          />
        </Group>
      </Container>
    </Modal>
  );
};

export default LeaveModal;
