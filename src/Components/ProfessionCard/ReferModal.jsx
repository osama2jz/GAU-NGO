import { Group, Container, Modal, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import routeNames from "../../Routes/routeNames";
import Button from "../Button";
import TextArea from "../TextArea";
import MySchedule from "./Schedule";

const ReferModal = ({
  opened,
  setOpened,
  buttonChange = false,
  referCase,
  setNewReferCase,
  id,
  setSlot,
  slot,
  onSubmit,
}) => {
  const { user } = useContext(UserContext);
  const navigate=useNavigate()
  const handleReferToExpert = useMutation(
    () => {
      return axios.post(
        `${backendUrl + "/api/case/referToExpert"}`,
        referCase,
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
            title: "Refered To Expert",
            message: "Refered Successfully!",
            color: "green",
          });
          setOpened(false);
          // navigate(routeNames.socialWorker.dashboard);
        } else {
          showNotification({
            title: "Failed",
            message: "Failed to refer",
            color: "red",
          });
          setOpened(false);
        }
      },
    }
  );
  console.log(slot)
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title="Refer User"
      size={"50%"}
      styles={{
        title: {
          // size: "50px",
          fontSize: "25px",
          fontWeight: "bold",
          color: "#5C5F66",
          textAlign: "center",
        },
      }}
    >
      <MySchedule Userid={id} setSlot={setSlot} />
      <Container>
        {!buttonChange && (
          <TextArea
            label={"Add comment"}
            placeholder="Write comment about user"
            onChange={(e) =>
              setNewReferCase({ ...referCase, referredComment: e.target.value })
            }
          />
        )}
        <Group pt={"sm"} position="right">
          <Button
            label="Cancel"
            onClick={() => {
              setOpened(false);
            }}
          />
          <Button
            label="Done"
            onClick={() => {
              buttonChange ? onSubmit.mutate() : handleReferToExpert.mutate();
              setOpened(false)
              
            }}
            disabled={!slot}
            primary={true}
          />
        </Group>
      </Container>
    </Modal>
  );
};
export default ReferModal;
