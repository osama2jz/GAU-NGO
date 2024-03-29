import { Group, Container, Modal, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
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
  const { user,translate } = useContext(UserContext);
  const matches = useMediaQuery("(min-width: 640px)");
  const [comment, setComment] = useState("");
  const handleReferToExpert = useMutation(
    () => {
      const obj = {
        caseId: caseId,
        referedTo: id,
        scheduleId: slot,
        referredComment: comment,
      };
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
            title: translate("Refered To Expert"),
            message: translate("Refered Successfully!"),
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
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title={translate("Refer User")}
      size={matches?"50%":"100%"}
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
      {/* <MySchedule Userid={id} setSlot={setSlot} slot={slot} /> */}
      <Container>
        {!buttonChange && (
          <TextArea
            label={"Add comment"}
            placeholder="Add comment"
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
            label="Submit"
            loading={handleReferToExpert?.isLoading}
            onClick={() => {
              handleReferToExpert.mutate();
              onSubmit.isSuccess && setOpened(false);
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
