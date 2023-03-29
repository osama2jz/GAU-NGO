import { Container, Grid, Text } from "@mantine/core";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Button from "../../../../Components/Button";
import Datepicker from "../../../../Components/Datepicker";
import InputField from "../../../../Components/InputField";
import Loader from "../../../../Components/Loader";
import Cards from "../../../../Components/ProfessionCard";
import SelectMenu from "../../../../Components/SelectMenu";
import { backendUrl } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
const Step2 = ({
  caseId,
  referedTo,
  setReferedTo,
  setSlot,
  onSubmit,
  slot,
}) => {
  const { user } = useContext(UserContext);
  const [cardData, setCardData] = useState([]);
  const [typeFilter, setTypeFilter] = useState("socialWorker");
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [professionalCardData, setProfessionalCardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
 

  const { data: users, status } = useQuery(
    "referSchedule",
    () => {
      return axios.get(backendUrl + `/api/schedule/listNGOUsersSchedule`, {
        headers: {
          "x-access-token": user?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
          let card = {
            userId: obj?.userId,
            name: obj?.fullName,
            role: obj?.role,
            branches: obj?.branches.map((e) => ({
              label: e.branchName,
              value: e.branchId,
            })),
            schedule: obj?.schedule,
          };
          return card;
        });
        setCardData(data);
      },
    }
  );

  useEffect(() => {
    getSchedule.mutate();
  }, [date, typeFilter]);

  const getSchedule = useMutation(
    () => {
      setLoading(true);
      return axios.post(
        `${backendUrl + "/api/schedule/listNGOUsersSchedule_2"}`,
        { date: date, type: typeFilter },
        {
          headers: {
            "x-access-token": user.token,
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
          };
          return card;
        });
        setProfessionalCardData(data);
        setLoading(false);
      },
    }
  );

  const filtered = professionalCardData?.filter((obj) =>
    obj?.name.toLowerCase().includes(search.toLowerCase())
  );
  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <Container size="lg" px={"0px"}>
        <Text fz={32} fw="bolder" align="center" mb={"md"}>
          Select Appointment Slot
        </Text>
        <Grid align={"center"} py="md">
          <Grid.Col md={12} lg={6}>
            <InputField
              placeholder="Search"
              leftIcon="search"
              label={"Search Professional"}
              pb="0"
              value={search}
              onChange={(v) => setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col md={6} lg={3}>
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
          <Grid.Col md={6} lg={3}>
            <SelectMenu
              placeholder="Select by Type"
              setData={setTypeFilter}
              label={"Filter Professionals"}
              value={typeFilter}
              data={[
                // { label: "All", value: "all" },
                { label: "Lawyer", value: "lawyer" },
                { label: "Psychologist", value: "psychologist" },
                { label: "Social Worker", value: "socialWorker" },
              ]}
            />
          </Grid.Col>
        </Grid>

        {loading ? (
          <Loader minHeight={"200px"} />
        ) : (
          <Grid>
            {filtered.length ? (
              filtered?.map((e) => (
                <Grid.Col md={6} lg={4} xl={3}>
                  <Cards
                    onSubmit={onSubmit}
                    buttonChange={true}
                    cardData={e}
                    setReferedTo={setReferedTo}
                    referedTo={referedTo}
                    setSlot={setSlot}
                    slot={slot}
                  />
                </Grid.Col>
              ))
            ) : (
              <Text fw={"bold"} align="center" m={"auto"} color="dimmed">
                No Professional Available
              </Text>
            )}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Step2;
