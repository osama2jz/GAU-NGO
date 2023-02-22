import { Container, Flex, Text } from "@mantine/core";
import { useStyles } from "./styles";
import { Grid } from "@mantine/core";
import Card from "./Card";
import Chart from "./Chart";
import routeNames from "../../Routes/routeNames";

const Dashboard = () => {
  const { classes } = useStyles();
  const a = [
    {
      title: "ALL USERS",
      value: 100,
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "Users",
      link: routeNames.socialWorker.userPageDashboard,
    },
    {
      title: "ALL APPOINTMENTS",
      value: 200,
      progress: 78,
      color: "#A9E34B",
      progressTitle: "Response Rate",
      icon: "Users",
      link: routeNames.socialWorker.appointmentPageDashboard,
    },
    {
      title: "ALL REPORTS",
      value: 150,
      progress: 78,
      color: "#087F5B",
      progressTitle: "Response Rate",
      icon: "Users",
      link: routeNames.socialWorker.reportPageDashboard,
    },
  ];
  return (
    <Container className={classes.main} size="lg" >
        <Text fz={26} fw="bolder" mb="sm" align="center">
          Dashboard
        </Text>

        <Grid>
          {a.map((item, index) => (
            <Grid.Col md={"auto"}>
              <Card data={item} />
            </Grid.Col>
          ))}
        </Grid>

        <Text fz={28} fw="bolder" mt="sm" mb="sm">
          Monthly Appointments{" "}
        </Text>
        <Chart />
    </Container>
  );
};
export default Dashboard;
