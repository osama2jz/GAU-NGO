import { Group, Container, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import Button from "../Button";
import TextArea from "../TextArea";

const ReferModal = ({opened,
  setOpened,
  onCancel,
  onDone,
  label,
  message,
  referCase,
  setNewReferCase,
}) => {
  const { user } = useContext(UserContext);
  const handleReferToExpert = useMutation(() => {
      return axios.post(`${backendUrl + "/api/case/referToExpert"}`, referCase, {
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
            color: "green",
          });
          setOpened(false)
          // navigate(routeNames.socialWorker.dashboard);
        } else {
          showNotification({
            title: "Failed",
            message: "Failed to refer",
            color: "red",
          });
          setOpened(false)
        }
      },
    }
  );
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title="Refer User"
    >
      <Container>
        <TextArea
          label={"Add comment"}
          placeholder="Write comment about user"
          onChange={(e) => setNewReferCase({ ...referCase, referredComment: e.target.value })}
        />
        <Group pt={"sm"} position="right">
          <Button label="Cancel" onClick={() => {setOpened(false)}} />
          <Button label="Done" onClick={()=>{handleReferToExpert.mutate()}} primary={true} />
        </Group>
      </Container>
    </Modal>
  );
};
export default ReferModal;
