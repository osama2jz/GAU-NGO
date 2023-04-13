import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import MySchedule from "../../../Components/ProfessionCard/Schedule";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const ViewRoasterModal = ({ opened, setOpened, id, setSlot }) => {
  const matches = useMediaQuery("(min-width: 600px)");
  const { translate } = useContext(UserContext);


  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title={translate("View Roaster")}
      size={matches? "50%":"100%"}
      // padding="0px"
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
