import { Container, Grid, Text } from "@mantine/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import InputField from "../../../../Components/InputField";
import Loader from "../../../../Components/Loader";
import Cards from "../../../../Components/ProfessionCard";
import SelectMenu from "../../../../Components/SelectMenu";
import { backendUrl, slots } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
import moment from "moment";
import Datepicker from "../../../../Components/Datepicker";

const Step4 = ({ caseId, slot, setSlot }) => {
  const { user } = useContext(UserContext);
  const [referCase, setNewReferCase] = useState();
  const [referedTo, setReferedTo] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("socialWorker");
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [selectedSlot, setSelectedSlot] = useState("all");
  const [professionalCardData, setProfessionalCardData] = useState([]);

  useEffect(() => {
    getSchedule.mutate();
  }, [date, typeFilter, selectedSlot]);

  const getSchedule = useMutation(
    () => {
      return axios.post(
        `${backendUrl + "/api/schedule/listNGOUsersSchedule_2"}`,
        { date: date, type: typeFilter, slot: selectedSlot },
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
      },
    }
  );

  const filtered = professionalCardData?.filter((obj) =>
    obj?.name?.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <>
      <Container size="lg">
        <Text fz={32} fw="bolder" align="center" mb={"md"}>
          Refer to Experts
        </Text>
        <Grid align={"center"} py="md">
          <Grid.Col md={6} lg={3}>
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
              label={"Select Slot"}
              placeholder="Select Slot"
              data={slots}
              value={selectedSlot}
              onChange={setSelectedSlot}
            />
          </Grid.Col>
        </Grid>

        {getSchedule.isLoading ? (
          <Loader minHeight={"200px"} />
        ) : (
          <Grid>
            {filtered.length ? (
              filtered?.map((e) => (
                <Grid.Col md={6} lg={4} xl={3}>
                  <Cards
                    // onSubmit={onSubmit}
                    // buttonChange={true}
                    referCase={referCase}
                    setNewReferCase={setNewReferCase}
                    cardData={e}
                    setReferedTo={setReferedTo}
                    referedTo={referedTo}
                    setSlot={setSlot}
                    slot={slot}
                    caseId={caseId}
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

export default Step4;
