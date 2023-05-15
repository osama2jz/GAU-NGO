import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import MySchedule from "../../../Components/ProfessionCard/Schedule";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import LeaveModal from "../../../Pages/MySchedule/Schedule/LeaveModal";

const ViewRoasterModal = ({ opened, setOpened, id, setSlot, reportData }) => {
  const matches = useMediaQuery("(min-width: 600px)");
  const { translate } = useContext(UserContext);
  const [openSingle, setOpenSingle] = useState(false);
  const [scheduledId, setScheduleId] = useState();
  const[single,setSingle]=useState(false)


  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title={translate("View Roaster")}
      size={matches ? "50%" : "100%"}
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
      <MySchedule
        Userid={id}
        setSlot={setSlot}
        opened={openSingle}
        setOpened={setOpenSingle}
        reportData={reportData}
        setScheduleId={setScheduleId}
        scheduledId={scheduledId}
        single={single}
        setSingle={setSingle}
      />
      {/* <LeaveModal opened={opened} setOpened={setOpened} date={date} branchId={scheduleData[0]?.branchId} setRefetch={setRefetch} scheduledId={scheduledId}/> */}
    </Modal>
  );
};
export default ViewRoasterModal;
