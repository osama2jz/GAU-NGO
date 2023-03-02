import { Modal } from "@mantine/core";
import MySchedule from "../../../Components/ProfessionCard/Schedule";

const ViewRoasterModal = ({ opened, setOpened, id, setSlot }) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title="View Roaster"
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
    </Modal>
  );
};
export default ViewRoasterModal;
