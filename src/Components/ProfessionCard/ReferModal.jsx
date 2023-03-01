import { Group, Container, Modal, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
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
  id,
  setSlot,
  slot,
  onSubmit,
  caseId,
}) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const handleReferToExpert = useMutation(
    () => {
      const obj = {
        caseId: caseId,
        referedTo: id,
        scheduleId: slot,
        referredComment: comment,
      };
      console.log(obj)
      return axios.post(`${backendUrl + "/api/case/referToExpert"}`, obj, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Refered To Expert",
            message: "Refered Successfully!",
            color: "green.0",
          });
          setOpened(false);
          // navigate(routeNames.socialWorker.dashboard);
        } else {
          showNotification({
            title: "Failed",
            message: "Failed to refer",
            color: "red.0",
          });
          setOpened(false);
        }
      },
    }
  );
  console.log(slot);
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
            onChange={(e) => setComment(e.target.value)}
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
              setOpened(false);
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
