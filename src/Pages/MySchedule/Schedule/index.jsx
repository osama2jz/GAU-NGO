import { Container, Flex, Grid, SimpleGrid, Text } from "@mantine/core";
import { useStyles } from "./styles";
import ScheduleCard from "../../../Components/ScheduleCard";
import CalendarDate from "../../../Components/Calendar";
import ContainerHeader from "../../../Components/ContainerHeader";

const MySchedule = () => {
  const { classes } = useStyles();
  const a = [
    { title: "BRANCH 1", time: "8:00 am - 12:00 pm", user: "3", meeting: "15" },
    { title: "BRANCH 1", time: "8:00 am - 12:00 pm", user: "3", meeting: "15" },
    { title: "BRANCH 1", time: "8:00 am - 12:00 pm", user: "3", meeting: "15" },
    { title: "BRANCH 1", time: "8:00 am - 12:00 pm", user: "3", meeting: "15" },
    { title: "BRANCH 1", time: "8:00 am - 12:00 pm", user: "3", meeting: "15" },
    { title: "BRANCH 1", time: "8:00 am - 12:00 pm", user: "3", meeting: "15" },
  ];
  return (
    <Container size={"xl"} className={classes.main}>
      <ContainerHeader label={"My Schedule"} />
      <Container className={classes.cal} mb="lg" mt="md" >
        <CalendarDate />
      </Container>
      <Text size={18} weight={700} color={"gray"} align="center">
        Today's Schedule
      </Text>
      <Container mt="md">
        <SimpleGrid
          breakpoints={[
            { minWidth: "md", cols: 2 },
            { minWidth: "lg", cols: 3 },
            { minWidth: "xs", cols: 1 },
          ]}
          spacing="xl"
        >
          {a.map((item, index) => (
            <Flex justify={"center"}>
              <ScheduleCard data={item} />
            </Flex>
          ))}
        </SimpleGrid>
      </Container>
    </Container>
  );
};

export default MySchedule;
