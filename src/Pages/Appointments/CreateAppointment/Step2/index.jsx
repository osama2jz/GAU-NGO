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
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState();
  const [professionalCardData, setProfessionalCardData] = useState([]);
  console.log(professionalCardData);

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

  const getSchedule = useMutation(
    () => {
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
            schedule: obj?.schedule,
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

  //filters
  useEffect(() => {
    //all data
    let data = users?.data?.data?.map((obj, ind) => {
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
    if (typeFilter === "all" && search === "") {
      setCardData(data);
    } else if (typeFilter === "all" && search !== "") {
      let filtered = data.filter((obj) =>
        obj.name.toLowerCase().includes(search.toLowerCase())
      );
      setCardData(filtered);
    } else {
      let filtered = data.filter(
        (obj) =>
          obj.role === typeFilter &&
          obj.name.toLowerCase().includes(search.toLowerCase())
      );
      setCardData(filtered);
    }
  }, [typeFilter, search]);

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
          {/* <Grid.Col md={6}>
            <InputField
              placeholder="Search"
              leftIcon="search"
              pb="0"
              onChange={(v) => setSearch(v.target.value)}
            />
          </Grid.Col> */}
          <Grid.Col md={5}>
            <Datepicker
              placeholder="Select Date"
              onChange={(v) => {
                setDate(moment(v).format("YYYY-MM-DD"));
              }}
            />
          </Grid.Col>
          <Grid.Col md={5}>
            <SelectMenu
              placeholder="Select by Type"
              setData={setTypeFilter}
              value={typeFilter}
              data={[
                { label: "All", value: "all" },
                { label: "Lawyer", value: "lawyer" },
                { label: "Psychologist", value: "psychologist" },
                { label: "Social Worker", value: "socialWorker" },
              ]}
            />
          </Grid.Col>
          <Grid.Col md={2} style={{ textAlign: "end" }}>
            <Button
              label={"Search "}
              w={"130px"}
              onClick={() => {
                getSchedule.mutate();
              }}
              bg={true}
              // loading={getSchedule.isLoading}
            />
          </Grid.Col>
        </Grid>
        {/* <Grid>
          {cardData.length ? (
            cardData?.map(
              (e) =>
                e.schedule && (
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
                )
            )
          ) : (
            <Text fw={"bold"} align="center" m={"auto"}>
              No Users found.
            </Text>
          )}
        </Grid> */}

        <Grid>
          {cardData.length ? (
            cardData?.map(
              (e) =>
                e.schedule && (
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
                )
            )
          ) : (
            <Text fw={"bold"} align="center" m={"auto"}>
              No Users found.
            </Text>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Step2;
