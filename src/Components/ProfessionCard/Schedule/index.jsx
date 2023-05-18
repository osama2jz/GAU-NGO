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
import LeaveModal from "./LeaveModal";
import Button from "../../Button";

const MySchedule = ({ Userid, setSlot, slot,setScheduleId,scheduledId,single,setSingle }) => {
  const { classes } = useStyles();
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const { user, translate } = useContext(UserContext);
  const [opened, setOpened] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleDates, setScheduleDates] = useState([]);
  const [refetch, setRefetch] = useState(false);
  // const[single,setSingle]=useState(false)


  useEffect(() => {
    getSchedule.mutate(date);
    getScheduleDates.mutate();
  }, [refetch]);

  const getScheduleDates = useMutation(
    () => {
      return axios.post(
        `${backendUrl + "/api/schedule/listSchedule"}`,
        { userId: Userid },
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
        { date: date, userId: Userid },
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
            title: obj?.NGOName,
            branch: obj?.branchName,
            startTime: obj?.timeStart,
            endTime: obj?.timeEnd,
            scheduleId: obj?.scheduleId,
            branchId: obj?.branchId,
            booked: obj?.booked,
          };
          return user;
        });
        setScheduleData(data);
      },
    }
  );
  return (
    <Container size={"xl"} className={classes.main}>
      <Container className={classes.cal} mb="lg" mt="md">
        <CalendarDate
          setDate={setDate}
          getSchedule={getSchedule}
          scheduleDates={scheduleDates}
          size="xs"
        />
      </Container>
      <Text size={18} weight={700} color={"gray"} align="center">
        {moment(date).format("DD MMMM")} {translate("Schedule")}
      </Text>
      {getSchedule.status === "loading" ? (
        <Loader minHeight="100px" />
      ) : scheduleData.length > 0 ? (
        scheduleData.filter((item) => !item.booked).length > 0 ? (
          <Container mt="md">
            <Group position="right" mb="md">
              <Button label={"Mark as Leave"} onClick={() => setOpened(true)} />
            </Group>
            <SimpleGrid
              breakpoints={[
                { minWidth: "md", cols: 2 },
                { minWidth: "lg", cols: 2 },
                { minWidth: "xs", cols: 1 },
              ]}
              spacing="xl"
            >
              {scheduleData.map(
                (item, index) =>
                  !item.booked && (
                    <Flex justify={"center"} key={index}>
                      <ScheduleCard data={item} setSlot={setSlot} slot={slot} setScheduleId={setScheduleId}
                       scheduledId={scheduledId} setOpened={setOpened} setSingle={setSingle}/>
                    </Flex>
                  )
              )}
            </SimpleGrid>
          </Container>
        ) : (
          <Text align="center" fw={"bold"} mt="xl" color="rgb(0,0,0,0.5)">
            {translate("All slots booked")}
          </Text>
        )
      ) : (
        <Text align="center" fw={"bold"} mt="xl" color="rgb(0,0,0,0.5)">
          {translate("No Duties Assigned")}
        </Text>
      )}
      <LeaveModal
        opened={opened}
        setOpened={setOpened}
        date={date}
        userId={Userid}
        setRefetch={setRefetch}
        branchId={scheduleData[0]?.branchId}
        scheduledId={scheduledId}
        single={single}
        setSingle={setSingle}
      />
    </Container>
  );
};

export default MySchedule;
