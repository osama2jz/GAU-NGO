import { useContext, useEffect, useState } from "react";
import {
  ColorSwatch,
  Container,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
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
import Button from "../../../Components/Button";
import LeaveModal from "./LeaveModal";

const MySchedule = () => {
  const { classes } = useStyles();
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const { user, translate } = useContext(UserContext);
  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleDates, setScheduleDates] = useState([]);
  const [opened, setOpened] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [scheduledId, setScheduleId] = useState();
  const [single, setSingle] = useState(false);

  useEffect(() => {
    getSchedule.mutate(date);
    getScheduleDates.mutate();
  }, [refetch]);

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
            booked: obj?.booked,
            branchId: obj?.branchId,
            scheduleId: obj?.scheduleId,
          };
          return user;
        });
        setScheduleData(data);
      },
    }
  );
  return (
    <Container size={"xl"} className={classes.main} p={"0px"}>
      <ContainerHeader label={"My Schedule"} />
      <Text align="center">
        {translate("Select date from the calender to view Schedule")}
      </Text>
      <Container className={classes.innerContainer} size="xl" p={"0px"}>
        <Group position="center" pt="10px">
          <Text>{translate("Guidlines for Calender Colors")}: </Text>
          <ColorSwatch color="green " />
          <Text>{translate("Duty Assigned.")}</Text>
          <ColorSwatch color="white" />
          <Text>{translate("No Duty.")}</Text>
        </Group>
        <Container className={classes.cal} mb="lg" mt="md">
          <CalendarDate
            setDate={setDate}
            getSchedule={getSchedule}
            scheduleDates={scheduleDates}
          />
        </Container>
        {/* <Flex direction={"column"} justify={"center"} align="center" gap={"xl"}> */}
        <Text size={18} weight={700} color={"gray"} align="center">
          {moment(date).format("DD")} {translate(moment(date).format("MMMM"))}{" "}
          {translate("Schedule")}
        </Text>
        {/* </Flex> */}
        {getSchedule.status === "loading" ? (
          <Loader minHeight="100px" />
        ) : scheduleData.length > 0 ? (
          <Container mt="md">
            <Group position="right" mb="md">
              <Button label={"Mark as Leave"} onClick={() => setOpened(true)} />
            </Group>
            <SimpleGrid
              breakpoints={[
                { minWidth: "md", cols: 3 },
                { minWidth: "lg", cols: 3 },
                { minWidth: "xs", cols: 2 },
              ]}
              spacing="xl"
            >
              {scheduleData.map((item, index) => (
                <Flex justify={"center"}>
                  <ScheduleCard
                    data={item}
                    setOpened={setOpened}
                    setScheduleId={setScheduleId}
                    setSingle={setSingle}
                    single={single}
                  />
                </Flex>
              ))}
            </SimpleGrid>
          </Container>
        ) : (
          <Text align="center" fw={"bold"} mt="xl" color="rgb(0,0,0,0.5)">
            {translate("No Duties Assigned")}
          </Text>
        )}
      </Container>
      <LeaveModal
        opened={opened}
        setOpened={setOpened}
        date={date}
        branchId={scheduleData[0]?.branchId}
        setRefetch={setRefetch}
        scheduledId={scheduledId}
        single={single}
        setSingle={setSingle}
      />
    </Container>
  );
};

export default MySchedule;
