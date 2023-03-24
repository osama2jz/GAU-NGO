import { Container, Grid, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Edit, Eye, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import DeleteModal from "../../../Components/DeleteModal";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import ViewProjectModal from "./ViewProjectModal";
import { useMutation } from "react-query";
import { showNotification } from "@mantine/notifications";
import moment from "moment/moment";
import Pagination from "../../../Components/Pagination";

export const ViewProjects = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { user } = useContext(UserContext);

  const queryClient = useQueryClient();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [statusChangeId, setStatusChangeId] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [viewModalData, setViewModalData] = useState();
  const [deleteID, setDeleteID] = useState("");
  const [rowData, setRowData] = useState([]);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [projectData,setProjectData]=useState()

  let headerData = [
    {
      id: "sr",
      numeric: true,
      disablePadding: true,
      label: "Sr #",
    },
    {
      id: "projectName",
      numeric: false,
      disablePadding: true,
      label: "Project Name",
    },
    {
      id: "createdDate",
      numeric: false,
      disablePadding: true,
      label: "Created Date",
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
      edit: <Edit color={theme.colors.green} />,
      delete: <Trash color={theme.colors.red} />,
      numeric: false,
      label: "Actions",
    },
  ];

  //API call for fetching all projects
  const { data, status } = useQuery(
    "fetchProjects",
    () => {
      return axios.get(`${backendUrl + `/api/project/listProjects`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
          let project = {
            id: obj._id,
            sr: ind + 1,
            projectName: obj?.projectName,
            createdDate: new moment(obj?.createdDate).format("DD MMM YYYY"),
            description: obj?.description,
            accStatus: obj?.status,
          };
          return project;
        });
        setRowData(data);
      },
    }
  );

  //API call for deleting a document
  const handleDeleteDocument = useMutation(
    (values) => {
      return axios.post(
        `${backendUrl + "/api/lookup/updateDocument"}`,
        values,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        console.log("response", response);
        if (response.data.status) {
          showNotification({
            title: "Document Created",
            message: deleteID
              ? "Document Deleted Successfully"
              : "Document Updated Successfully!",
            color: "green.0",
          });
          // navigate(routeNames.ngoAdmin.viewDocuments);
        } else {
          showNotification({
            title: "Failed",
            message: deleteID ? "Failed to Delete" : "Failed to Update",
            color: "red.0",
          });
        }
        queryClient.invalidateQueries("fetchDocumentsAll");
      },
    }
  );

  //API call for deleting project
  const handleDeleted = () => {
    handleDeleteDocument.mutate({
      documentId: deleteID,
      status: "deleted",
    });
    setOpenDeleteModal(false);
  };

  const filteredItems = rowData.filter(
    (item) =>
      item?.projectName?.toLowerCase().includes(search.toLowerCase()) &&
      item?.accStatus?.toLowerCase().includes(filter.toLowerCase())
  );
  const paginated = useMemo(() => {
    if (activePage == 1) {
      return filteredItems.slice(0, 10);
    } else {
      let a = (activePage - 1) * 10;
      return filteredItems.slice(a, a + 10);
    }
  }, [activePage, filteredItems]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"View Projects"} />

      <Container className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={5} lg={5} md={6}>
            <InputField
              placeholder="Search"
              leftIcon="search"
              pb="0"
              onChange={(v) => setSearch(v.target.value)}
              value={search}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={3} md={3}>
            <SelectMenu
              placeholder="Filter by Status"
              value={filter}
              setData={setFilter}
              pb="0px"
              data={[
                { label: "All", value: "" },
                { label: "Closed", value: "closed" },
                // { label: "Scheduled", value: "scheduled" },
                { label: "Cancelled", value: "cancelled" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={1} md={3} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              onClick={() => {
                setFilter("");
                setSearch("");
              }}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={3} md={4} style={{ textAlign: "end" }}>
            <Button
              label={"Add Appointment"}
              bg={true}
              leftIcon={"plus"}
              styles={{ float: "right" }}
              onClick={() => navigate(routeNames.socialWorker.addAppoinment)}
            />
          </Grid.Col>
        </Grid>
        {status == "loading" ? (
          <Loader />
        ) : (
          <Table
            headCells={headerData}
            rowData={paginated}
            setViewModalState={setOpenViewModal}
            setViewModalData={setViewModalData}
            setStatusChangeId={setStatusChangeId}
            setDeleteData={setDeleteID}
            setEditProject={true}
            setDeleteModalState={setOpenDeleteModal}
            setReportData={setProjectData}
          />
        )}
        {totalPages > 1 && (
          <Pagination
            activePage={activePage}
            setPage={setPage}
            total={totalPages}
            radius="xl"
          />
        )}
      </Container>
      <DeleteModal
        opened={openDeleteModal}
        setOpened={setOpenDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={handleDeleted}
        label="Are you Sure?"
        message="Do you really want to delete these records? This process cannot be undone."
      />
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title={"View Project"}
        
      >
        <ViewProjectModal id={viewModalData} reportData={projectData} />
      </ViewModal>
    </Container>
  );
};
