import {
  Container,
  Flex,
  Grid,
  Image,
  Select,
  SimpleGrid,
  Text,
  Avatar,
  Badge,
  useMantineTheme,
} from "@mantine/core";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Checks, Edit, Eye, Plus, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import DeleteModal from "../../../Components/DeleteModal";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import VerifyIcon from "../../../assets/id.png";
import userlogo from "../../../assets/teacher.png";
import ViewModal from "../../../Components/ViewModal/viewUser";
import ContainerHeader from "../../../Components/ContainerHeader";
import ViewUserModal from "./ViewUserModal";
import { useQuery } from "react-query";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import moment from "moment";
const VerificationScheduled = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme=useMantineTheme()
  const { user } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewModalData,setViewModalData]=useState()
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  let headerData = [
    {
      id: "sr",
      numeric: true,
      disablePadding: true,
      label: "Sr #",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Registration Date",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "User Status",
    },
    {
      id: "userVerify",
      numeric: false,
      disablePadding: true,
      label: "Verify",
    },
    {
      id: "accStatus",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
    
    {
      id: "actions",
      view: <Eye color={theme.colors.blue} />,
      numeric: false,
      label: "Actions",
    },
  ];

  //API call for fetching all users
  const { data, status } = useQuery(
    "fetchUsers",
    () => {
      return axios.get(
        `${backendUrl + `/api/ngo/listNGOUsers/user/${activePage}/10/unverified`}`,
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
            id: obj._id,
            sr: ind + 1,
            name: obj.firstName + " " + obj.lastName,
            email: obj.email,
            status: obj.verificationStatus,
            accStatus: obj.userStatus,
            date: new moment(obj.createdAt).format("DD-MMM-YYYY"),
            phone:obj.phoneNumber,
            
          };
          return user;
        });
        setRowData(data);
        setTotalPages(response.data.data.totalPages);
      },
    }
  );
  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"Users Schedule"} />
      <Container p={"xs"} className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField placeholder="Search" leftIcon="search" pb="0" />
          </Grid.Col>
          <Grid.Col sm={6} md={3}>
            <SelectMenu
              placeholder="Filter by Status"
              data={[
                { label: "verified", value: "verified" },
                { label: "Pending", value: "pending" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={3} ml="auto">
            <Button
              label={"Add User"}
              bg={true}
              leftIcon={"plus"}
              styles={{ float: "right" }}
              onClick={() => navigate(routeNames.socialWorker.addUser)}
            />
          </Grid.Col>
        </Grid>
        <Table
          headCells={headerData}
          rowData={rowData}
          setViewModalState={setOpenViewModal}
          setViewModalData={setViewModalData}
        />
      </Container>
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="User Schedule Details"
        size="550px"
      >
        <ViewUserModal id={viewModalData}/>
      </ViewModal>
    </Container>
  );
};
export default VerificationScheduled;
