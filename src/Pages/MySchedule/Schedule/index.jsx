import { useContext, useEffect, useState } from "react";
import { Container, Flex, Grid, Group, SimpleGrid, Text } from "@mantine/core";
import { useStyles } from "./styles";
import ScheduleCard from "../../../Components/ScheduleCard";
import CalendarDate from "../../../Components/Calendar";
import ContainerHeader from "../../../Components/ContainerHeader";
import { useMutation } from "react-query";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import Loader from "../../../Components/Loader";
import moment from "moment";

const MySchedule = () => {
  const { classes } = useStyles();
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const { user } = useContext(UserContext);
  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleDates, setScheduleDates] = useState([]);

  useEffect(() => {
    getSchedule.mutate(date);
    getScheduleDates.mutate();
  }, []);

  const getScheduleDates = useMutation(
    () => {
      return axios.post(
        `${backendUrl + "/api/schedule/listSchedule"}`,
        {},
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        setScheduleDates(response.data.dates);
      },
    }
  );

  const getSchedule = useMutation(
    (date) => {
      return axios.post(
        `${backendUrl + "/api/schedule/listSchedule"}`,
        { date: date },
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
          let user = {
            id: ind + 1,
            title: obj.NGOName,
            branch: obj.branchName,
            startTime: obj.timeStart,
            endTime: obj.timeEnd,
          };
          return user;
        });
        setScheduleData(data);
      },
    }
  );
  return (
    <Container size={"xl"} className={classes.main}>
      <ContainerHeader label={"My Schedule"} />
      <Text align="center">Select date from the calender to view Schedule</Text>
      <Container className={classes.cal} mb="lg" mt="md">
        <CalendarDate setDate={setDate} getSchedule={getSchedule} scheduleDates={scheduleDates}/>
      </Container>
      <Text size={18} weight={700} color={"gray"} align="center">
        {moment(date).format("DD MMMM")} Schedule
      </Text>
      {getSchedule.status === "loading" ? (
        <Loader minHeight="100px" />
      ) : scheduleData.length > 0 ? (
        <Container mt="md">
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 3 },
              { minWidth: "xs", cols: 1 },
            ]}
            spacing="xl"
          >
            {scheduleData.map((item, index) => (
              <Flex justify={"center"}>
                <ScheduleCard data={item} />
              </Flex>
            ))}
          </SimpleGrid>
        </Container>
      ) : (
        <Text align="center" fw={"bold"} mt="xl" color="rgb(0,0,0,0.5)">
          No Duties Assigned
        </Text>
      )}
    </Container>
  );
};

export default MySchedule;
