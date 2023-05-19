import { Group, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "../../Components/Button";
import TextArea from "../../Components/TextArea";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";

const ReplyModal = ({ setOpenReplyModal, replyModalId, openReplyModal }) => {
  const [reply, setReply] = useState("");
  const { user,translate } = useContext(UserContext);
  const queryClient = useQueryClient();
  const handleReply = useMutation(
    async () => {
      return axios.post(
        backendUrl + `/api/complaints/reply`,
        { complaintId: replyModalId, reply: reply },
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (res) => {
        showNotification({
          title: translate("Success"),
          message: translate("Reply posted successfully"),
          color: "green.0",
        });
        queryClient.invalidateQueries("fetchAllComplains");
        setOpenReplyModal(false);
      },
      onError: (res) => {
        showNotification({
          title: translate("Error"),
          message: translate("Something went Wrong"),
          color: "red.0",
        });
      },
    }
  );
  return (
    <Modal
      opened={openReplyModal}
      title={translate("Reply Here")}
      centered
      onClose={() => setOpenReplyModal(false)}
    >
      <TextArea
        placeholder={translate("Write a response...")}
        rows={5}
        onChange={(v) => setReply(v.target.value.trim())}
      />
      <Group position="right">
        <Button
          label={"Submit"}
          primary={true}
          disabled={!reply.length}
          onClick={() => handleReply.mutate()}
          loading={handleReply.isLoading}
        />
      </Group>
    </Modal>
  );
};
export default ReplyModal;
