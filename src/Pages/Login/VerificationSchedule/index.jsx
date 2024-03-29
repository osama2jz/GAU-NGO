import { Container, Grid, Loader, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import Button from "../../../Components/Button";
import Datepicker from "../../../Components/Datepicker";
import InputField from "../../../Components/InputField";
// import Loader from "../../../Components/Loader";
import ConfirmationModal from "../../Appointments/CreateAppointment/ConfirmationModal";
import Cards from "../../../Components/ProfessionCard";
import { backendUrl, slots } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import SelectMenu from "../../../Components/SelectMenu";

const VerificationSchedule = ({ socialWorkerVerification, userId }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { user, setUser, translate } = useContext(UserContext);
  const [professionalCardData, setProfessionalCardData] = useState([]);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [opened, setOpened] = useState(false);
  const [slotId, setSlotId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("all");
  const [referedToId, setReferedToId] = useState(null);
  

  useEffect(() => {
    getSchedule.mutate();
  }, [date, selectedSlot]);
  const getSchedule = useMutation(
    () => {
      let payload = { date: date, type: "socialWorker" };
      if (selectedSlot !== "all") payload["slot"] = selectedSlot;
      return axios.post(
        `${backendUrl + "/api/schedule/listNGOUsersSchedule_2"}`,
        payload,
        {
          headers: {
            "x-access-token": user?.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
          let card = {
            userId: obj?.userId,
            name: obj?.fullName,
            role: obj?.role,
            branchId: obj?.branchId,
            schedule: obj?.scheduleId,
            timeStartSlot: obj?.timeStartSlot,
            timeEndSlot: obj?.timeEndSlot,
            scheduleStatus: obj?.scheduleStatus,
            image: obj?.profileImage,
          };
          return card;
        });
        setProfessionalCardData(data);
      },
    }
  );

  //create appointment
  const handleCreateAppointment = useMutation(
    (values) => {
      console.log("here", user);
      return axios.post(
        `${backendUrl + "/api/user/scheduleVerification"}`,
        {
          appointmentUser: socialWorkerVerification
            ? userId?.data?.data?._id
            : user?.id,
          appointmentWith: referedToId,
          scheduleId: slotId,
          appointmentType: "verification",
        },
        {
          headers: {
            "x-access-token": user?.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: translate("Appointment Created"),
            message: translate("Appointment Created Successfully"),
            color: "green.0",
          });
          let appointmentTime =
            response.data.data.split(" ")[
              response.data.data.split(" ").length - 1
            ];
          let appointmentDate = response.data.data
            .split(" ")
            .slice(0, 4)
            .join(" ");
          socialWorkerVerification
            ? navigate(routeNames.socialWorker.verificationScheduled)
            : navigate(routeNames.general.verificationPending, {
                state: {
                  data: {
                    appointmentTime: appointmentTime,
                    appointmentDate: appointmentDate,
                    otherInfo: response.data,
                  },
                },
              });
          setOpened(false);
        } else {
          showNotification({
            title: translate("Error"),
            message: translate(response.data.message),
            color: "red.0",
          });
        }
      },
    }
  );

  const filtered = professionalCardData?.filter((obj) =>
    obj?.name.toLowerCase().includes(search.toLowerCase())
  );
  if (getSchedule.isLoading === "loading") {
    return <Loader />;
  }
  return (
    <Container size="lg" py={"xl"}>
      <Text fz={32} fw="bolder" align="center">
        {translate("Book An Appointment")}
      </Text>
      <Text fz={15} align="center" mb={"md"}>
        {translate(
          "Your profile is not verified yet, please schedule a meeting for your account verification"
        )}
        .
      </Text>
      <Button
        label={"Log Out"}
        onClick={() => {
          localStorage.clear();
          setUser();
          navigate(routeNames.general.login);
        }}
        styles={{ display: "flex", marginLeft: "auto" }}
      />
      <Grid align={"center"} py="md">
        <Grid.Col sm={6}>
          <InputField
            placeholder="Search"
            leftIcon="search"
            label={"Search Professional"}
            pb="0"
            value={search}
            onChange={(v) => setSearch(v.target.value)}
          />
        </Grid.Col>
        <Grid.Col sm={3}>
          <Datepicker
            placeholder="Select Date"
            label={"Select Date"}
            onChange={(v) => {
              setDate(moment(v).format("YYYY-MM-DD"));
            }}
            value={new Date()}
            minDate={new Date()}
          />
        </Grid.Col>
        <Grid.Col sm={3}>
          <SelectMenu
            label={"Select Slot"}
            placeholder="Select Slot"
            data={slots}
            value={selectedSlot}
            onChange={setSelectedSlot}
          />
        </Grid.Col>
      </Grid>

      {getSchedule.isLoading ? (
        <Container
          h="50vh"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader size={"xl"} />
        </Container>
      ) : (
        <Grid>
          {filtered.length ? (
            filtered?.map((e) => (
              <Grid.Col
                xs={6}
                sm={4}
                md={4}
                lg={3}
                xl={3}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Cards
                  // handleCreateAppointment={handleCreateAppointment}
                  buttonChange={true}
                  cardData={e}
                  setReferedTo={setReferedToId}
                  setSlot={setSlotId}
                  // verification={true}
                  setOpened={setOpened}
                />
              </Grid.Col>
            ))
          ) : (
            <Container
              h="50vh"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                fw={"bold"}
                align="center"
                m={"auto"}
                color="dimmed"
                fz={"lg"}
              >
                No Social Worker Available
              </Text>
            </Container>
          )}
        </Grid>
      )}
      <ConfirmationModal
        setOpened={setOpened}
        opened={opened}
        onSubmit={handleCreateAppointment}
      />
    </Container>
  );
};

export default VerificationSchedule;
