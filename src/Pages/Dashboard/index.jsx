import { Container, Flex, Text } from "@mantine/core";
import { useStyles } from "./styles";
import { Grid } from "@mantine/core";
import Card from "./Card";
import Chart from "./Chart";

const Dashboard = () => {
  const { classes } = useStyles();
  const a = [
    {
      title: "TOTAL USERS",
      value: 100,
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "Users",
    },
    {
      title: "ACTIVE USERS",
      value: 200,
      progress: 78,
      color: "#A9E34B",
      progressTitle: "Response Rate",
      icon: "Users",
    },
    {
      title: "VERIFIED USERS",
      value: 150,
      progress: 78,
      color: "#087F5B",
      progressTitle: "Response Rate",
      icon: "Users",
    },
    {
      title: "UNVERIFY USERS",
      value: 50,
      progress: 78,
      color: "#E03131",
      progressTitle: "Response Rate",
      icon: "Users",
    },
  ];
  return (
    <Container className={classes.main} size="lg">
      {/* <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}> */}
      {/* <Grid.Col span={9}> */}
      <Container className={classes.left} size="lg">
        <Text fz={28} fw="bolder" mb="sm">
          Dashboard
        </Text>
        <Grid>
          {a.map((item, index) => (
            <Grid.Col md={"auto"} lg="3">
              <Card data={item} />
            </Grid.Col>
          ))}
        </Grid>

        <Text fz={28} fw="bolder" mt="sm" mb="sm">
          Monthly Appointments{" "}
        </Text>
        {/* <Container bg="white" p={20}> */}
        <Chart />
        {/* </Container> */}
      </Container>
      {/* </Grid.Col> */}
      {/* // <Grid.Col span={3}> */}
      {/* // <Container className={classes.main} size="lg"></Container>     */}
      {/* </Grid.Col> */}
      {/* // </Grid> */}
    </Container>
  );
};
export default Dashboard;
