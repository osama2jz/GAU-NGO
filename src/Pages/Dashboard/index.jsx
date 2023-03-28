import { Container, Flex, Text } from "@mantine/core";
import { useStyles } from "./styles";
import { Grid } from "@mantine/core";
import Card from "./Card";
import Chart from "./Chart";
import routeNames from "../../Routes/routeNames";
import { useQuery } from "react-query";
import { backendUrl } from "../../constants/constants";
import { useContext, useMemo, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { Users } from "tabler-icons-react";

const Dashboard = () => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const [chartData, setChartData] = useState([]);
  const [cardData, setCardData] = useState([
    {
      title: "TOTAL USERS",
      value: null,
      progress: 78,
      color: "red.0",
      progressTitle: "Response Rate",
      icon: "userD",
      link: routeNames.socialWorker.userPageDashboard,
    },
    {
      title: "TOTAL APPOINTMENTS",
      value: null,
      progress: 78,
      color: "green.0",
      progressTitle: "Response Rate",
      icon: "apD",
      link: routeNames.socialWorker.appointmentPageDashboard,
    },
    {
      title: "TOTAL REPORTS",
      value: null,
      progress: 78,
      color: "blue.0",
      progressTitle: "Response Rate",
      icon: "reD",
      link: routeNames.socialWorker.reportPageDashboard,
    },
  ]);
  const [cardData1, setCardData1] = useState([
    {
      title: "TOTAL BRANCHES",
      value: null,
      progress: 78,
      color: "red.0",
      progressTitle: "Response Rate",
      icon: "branch",
      link: routeNames.ngoAdmin.branchPageDashboard,
    },
    {
      title: "TOTAL PROFESSIONALS",
      value: null,
      progress: 78,
      color: "green.0",
      progressTitle: "Response Rate",
      icon: "proD",
      link: routeNames.ngoAdmin.professionPageDashboard,
    },
    {
      title: "TOTAL CASES",
      value: null,
      progress: 78,
      color: "blue.0",
      progressTitle: "Response Rate",
      icon: "caseD",
      // link: routeNames.socialWorker.reportPageDashboard,
    },
  ]);

 const [cardData3, setCardData3] = useState([
  {
    title: "TOTAL APPOINTMENTS",
    value: null,
    progress: 78,
    color: "red.0",
    progressTitle: "Response Rate",
    icon: "branch",
    // link: routeNames.ngoAdmin.branchPageDashboard,
  },
  {
    title: "TOTAL DONATIONS",
    value: null,
    progress: 78,
    color: "green.0",
    progressTitle: "Response Rate",
    icon: "branch",
    // link: routeNames.ngoAdmin.branchPageDashboard,
  },
  {
    title: "TOTAL COMPLAINTS",
    value: null,
    progress: 50,
    color: "blue.0",
    progressTitle: "Response Rate",
    icon: "branch",
    // link: routeNames.ngoAdmin.branchPageDashboard,
  },
  
 ])

  const allCard = useMemo(() => {
    if (user.role == "Admin") return [...cardData1, ...cardData];
    if(user.role=="User") return [...cardData3]
    else return cardData;
  }, []);

  //API call for dashboard stats
  const { data: statsData, status } = useQuery(
    "stats",
    () => {
      let link=user.role=="Admin"?"/api/ngo/admin-ngo-statistics":user.role=="User" ?  "/api/ngo/user-statistics" :"/api/ngo/statistics" ;
      return axios.get(`${backendUrl + link}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if(response.status){
          if(user.role=="Admin"){
            let branches = cardData1[0];
            let professionals = cardData1[1];
            let cases = cardData1[2];
            branches.value = response.data.data.totalBranches;
            professionals.value = response.data.data.totalProfessionals;
            cases.value = response.data.data.totalCases;
            setCardData1([branches, professionals, cases]);

            let users = cardData[0];
            let app = cardData[1];
            let reports = cardData[2];
            users.value = response?.data?.data?.totalUsers;
            app.value = response?.data?.data?.totalAppointments;
            reports.value = response?.data?.data?.totalReports;
            setCardData([users, app, reports]);
            setChartData(response?.data?.data?.graphData);
          }
          else if(user.role=="User"){
            let app = cardData3[0];
            let donations = cardData3[1];
            let complaints = cardData3[2];

            app.value = response?.data?.data?.allAppointments;
            donations.value = response?.data?.data?.allDonations;
            complaints.value = response?.data?.data?.allComplaints;

            setCardData3([app, donations, complaints]);
            setChartData(response?.data?.data?.graphData);

          }
          else{
            let users = cardData[0];
            let app = cardData[1];
            let reports = cardData[2];
            users.value = response?.data?.data?.allNgoUsers;
            app.value = response?.data?.data?.allAppointments;
            reports.value = response?.data?.data?.allReports;
            setCardData([users, app, reports]);
            setChartData(response.data.data.graphData);
          }
        }
        else{
          console.log(response.data.message);
        }
       
        // console.log(response.data);
      },
    }
  );
  return (
    <Container className={classes.main} size="lg">
      <Text fz={26} fw="bolder" mb="sm" align="center">
        Dashboard
      </Text>

      <Grid align={"center"} justify="center">
        {allCard.map((item, index) => (
          <Grid.Col md={"auto"}>
            <Card data={item} />
          </Grid.Col>
        ))}
      </Grid>

      <Text fz={24} fw="bolder" mt="sm" mb="sm">
        Monthly Appointments{" "}
      </Text>
      <Chart data={chartData} />
    </Container>
  );
};
export default Dashboard;
