import { Container, Grid, Text } from "@mantine/core";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";
import ContainerHeader from "../../Components/ContainerHeader";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import routeNames from "../../Routes/routeNames";
import Card from "./Card";
import Chart from "./Chart";
import { useStyles } from "./styles";

const Dashboard = () => {
  const { classes } = useStyles();
  const { user, translate } = useContext(UserContext);
  console.log(user,"user")
  const [chartData, setChartData] = useState([]);
  const [cardData, setCardData] = useState([
    {
      title: "Total Users",
      value: null,
      progress: 78,
      color: "red.0",
      progressTitle: "Response Rate",
      icon: "userD",
      link: routeNames.socialWorker.userPageDashboard,
    },
    {
      title: "Total Appointments",
      value: null,
      progress: 78,
      color: "green.0",
      progressTitle: "Response Rate",
      icon: "apD",
      link: routeNames.socialWorker.appointmentPageDashboard,
    },
    {
      title: "Total Reports",
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
      title: "Total Branches",
      value: null,
      progress: 78,
      color: "red.0",
      progressTitle: "Response Rate",
      icon: "branch",
      link: routeNames.ngoAdmin.branchPageDashboard,
    },
    {
      title: "Total Professionals",
      value: null,
      progress: 78,
      color: "green.0",
      progressTitle: "Response Rate",
      icon: "proD",
      link: routeNames.ngoAdmin.professionPageDashboard,
    },
    {
      title: "Total Cases",
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
    title: "Total Appointments",
    value: null,
    progress: 78,
    color: "red.0",
    progressTitle: "Response Rate",
    icon: "branch",
    // link: routeNames.ngoAdmin.branchPageDashboard,
  },
  {
    title: "Total Donations",
    value: null,
    progress: 78,
    color: "green.0",
    progressTitle: "Response Rate",
    icon: "branch",
    // link: routeNames.ngoAdmin.branchPageDashboard,
  },
  {
    title: "Total Complaints",
    value: null,
    progress: 50,
    color: "blue.0",
    progressTitle: "Response Rate",
    icon: "branch",
    // link: routeNames.ngoAdmin.branchPageDashboard,
  },
  
 ])

 const [cardData4, setCardData4] = useState([
  {
    title: "Total NGOS",
    value: null,
    progress: 78,
    color: "red.0",
    progressTitle: "Response Rate",
    icon: "branch",
    // link: routeNames.ngoAdmin.branchPageDashboard,
  },
  {
    title: "Total Users",
    value: null,
    progress: 78,
    color: "green.0",
    progressTitle: "Response Rate",
    icon: "branch",
    // link: routeNames.ngoAdmin.branchPageDashboard,
  },
  {
    title: "Total Employees",
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
    if(user.role==="Super Admin") return [...cardData4]
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
          if(user.role=="Admin" || user.role==="Super Admin"){
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
      <ContainerHeader label={"Dashboard"} />

      <Grid align={"center"} justify="center">
        {allCard.map((item, index) => (
          <Grid.Col md={"auto"} key={index}>
            <Card data={item} />
          </Grid.Col>
        ))}
      </Grid>

      <Text fz={24} fw="bolder" mt="sm" mb="sm">
        {translate("Monthly Appointments")}
      </Text>
      <Chart data={chartData} />
    </Container>
  );
};
export default Dashboard;
