import { Container, Grid, useMantineTheme } from "@mantine/core";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Eye } from "tabler-icons-react";
import Button from "../../Components/Button";

import ContainerHeader from "../../Components/ContainerHeader";
import InputField from "../../Components/InputField";
import Loader from "../../Components/Loader";
import SelectMenu from "../../Components/SelectMenu";
import Table from "../../Components/Table";
import ViewModal from "../../Components/ViewModal/viewUser";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import routeNames from "../../Routes/routeNames";
// import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import ViewUserModal from "./ViewUserModal";

export const ViewComplains = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [statusChangeId, setStatusChangeId] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [viewModalData, setViewModalData] = useState();
  const [deleteID, setDeleteID] = useState("");
  const [rowData, setRowData] = useState([]);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(UserContext);

  console.log("user", user);

  const [reportData, setReportData] = useState([]);

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
      label: "User Name",
    },
    {
      id: "amount",
      numeric: false,
      disablePadding: true,
      label: "Subject",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Complaint Date",
    },
    {
      id: "description",
      numeric: false,
      disablePadding: true,
      label: "Complaint Description",
    },
    {
      id: "ngo",
      numeric: false,
      disablePadding: true,
      label: "NGO Name",
    },
    {
      id: "actions",
      view: <Eye color={theme.colors.blue} />,
      numeric: false,
      label: "Actions",
    },
  ];

  //API call for fetching all donations
  const { data, status } = useQuery(
    ["fetchAllDonations", filter, search, activePage],
    () => {
      return axios.get(
        `${
          backendUrl + `/api/complaints/listComplaints`
          // `/api/ngo/listAllBranches/${activePage}/10/${filter}/${search}`
        }`,
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
          let branch = {
            id: obj._id,
            sr: ind + 1,
            name: obj?.userId?.firstName + " " + obj?.userId?.lastName,
            amount: obj?.subject,
            date: moment(obj?.createdAt).format("DD-MM-YYYY"),
            ngo: obj?.ngoId?.ngoName,
            description: obj?.description,
          };
          return branch;
        });
        setRowData(data);
        // setTotalPages(response.data.totalPages);
      },
    }
  );

 

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"View Complaints"} />

      <Container className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField
              placeholder="Search"
              leftIcon="search"
              pb="0"
              onKeyDown={(v) => v.key === "Enter" && setSearch(v.target.value)}
            />
          </Grid.Col>
         
          <Grid.Col sm={3} ml="auto">
            <Button
              label={"Add Complain"}
              bg={true}
              leftIcon={"plus"}
              styles={{ float: "right" }}
              onClick={() => navigate(routeNames.user.addComplaint)}
            />
          </Grid.Col>
        </Grid>
        {status == "loading" ? (
          <Loader />
        ) : (
          <Table
            headCells={headerData}
            rowData={rowData}
            setViewModalState={setOpenViewModal}
            setViewModalData={setViewModalData}
            setEditModalState={setOpenEditModal}
            setStatusChangeId={setStatusChangeId}
            // onStatusChange={handleChangeStatus.mutate}
            setDeleteData={setDeleteID}
            setDeleteModalState={setOpenDeleteModal}
            setReportData={setReportData}
          />
        )}
        {/* {totalPages > 1 && (
          <Pagination
            activePage={activePage}
            setPage={setPage}
            total={totalPages}
            radius="xl"
          />
        )} */}
      </Container>

      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="Complaint Details"
      >
        {/* <ViewUser id={viewModalData}/> */}
        <ViewUserModal id={viewModalData} reportData={reportData} />
      </ViewModal>
    </Container>
  );
};
