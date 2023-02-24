import { Container, Flex, Text } from "@mantine/core";
import { useStyles } from "./styles";
import { Grid } from "@mantine/core";
import Card from "./Card";
import Chart from "./Chart";
import routeNames from "../../Routes/routeNames";
import { useQuery } from "react-query";
import { backendUrl } from "../../constants/constants";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { Users } from "tabler-icons-react";

const Dashboard = () => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const [chartData, setChartData] = useState([])
  const [cardData, setCardData] = useState([
    {
      title: "ALL USERS",
      value: null,
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "userD",
      link: routeNames.socialWorker.userPageDashboard,
    },
    {
      title: "ALL APPOINTMENTS",
      value: null,
      progress: 78,
      color: "#A9E34B",
      progressTitle: "Response Rate",
      icon: "apD",
      link: routeNames.socialWorker.appointmentPageDashboard,
    },
    {
      title: "ALL REPORTS",
      value: null,
      progress: 78,
      color: "#087F5B",
      progressTitle: "Response Rate",
      icon: "reD",
      link: routeNames.socialWorker.reportPageDashboard,
    },
  ]);

  //API call for dashboard stats
  const { data: statsData, status } = useQuery(
    "stats",
    () => {
      return axios.get(`${backendUrl + `/api/ngo/statistics`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let users=cardData[0]
        let app=cardData[1]
        let reports=cardData[2]
        users.value=response.data.data.allNgoUsers
        app.value=response.data.data.allAppointments
        reports.value=response.data.data.allReports
        setCardData([users, app,reports ])
        setChartData(response.data.data.graphData)
      },
    }
  );
  return (
    <Container className={classes.main} size="lg">
      <Text fz={26} fw="bolder" mb="sm" align="center">
        Dashboard
      </Text>

      <Grid>
        {cardData.map((item, index) => (
          <Grid.Col md={"auto"}>
            <Card data={item} />
          </Grid.Col>
        ))}
      </Grid>

      <Text fz={28} fw="bolder" mt="sm" mb="sm">
        Monthly Appointments{" "}
      </Text>
      <Chart data={chartData}/>
    </Container>
  );
};
export default Dashboard;
