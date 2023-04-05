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
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";

const VerificationSchedule = ({}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);
  const [professionalCardData, setProfessionalCardData] = useState([]);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [opened, setOpened] = useState(false);
  const [slotId, setSlotId] = useState(null);
  const [referedToId, setReferedToId] = useState(null);

  useEffect(() => {
    getSchedule.mutate();
  }, [date]);

  const getSchedule = useMutation(
    () => {
      return axios.post(
        `${backendUrl + "/api/schedule/listNGOUsersSchedule_2"}`,
        { date: date, type: "socialWorker" },
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
            image: obj?.profileImage
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
      return axios.post(
        `${backendUrl + "/api/user/scheduleVerification"}`,
        {
          appointmentUser: user?.id,
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
            title: "Appointment Created",
            message: "Appointment Created Successfully",
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
          navigate(routeNames.general.verificationPending, {
            state: {
              data: {
                appointmentTime: appointmentTime,
                appointmentDate: appointmentDate,
              },
            },
          });
          setOpened(false);
        } else {
          showNotification({
            title: "Error",
            message: response.data.message,
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
        Book An Appointment
      </Text>
      <Text fz={15} align="center" mb={"md"}>
        Your profile is not verified yet, please schedule a meeting for your
        account verification.
      </Text>
      <Button
        label={"Log Out"}
        onClick={() => {
          localStorage.clear();
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
        <Grid.Col sm={6}>
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
