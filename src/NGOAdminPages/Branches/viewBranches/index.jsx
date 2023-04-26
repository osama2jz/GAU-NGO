import { Container, Grid, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Edit, Eye, Trash } from "tabler-icons-react";
import ngoDefault from "../../../assets/ngoDefault.png";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import DeleteModal from "../../../Components/DeleteModal";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";

import { useStyles } from "./styles";
import ViewBranchModal from "./ViewBranchModal";

export const ViewBranches = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [viewModalData, setViewModalData] = useState();
  const [deleteID, setDeleteID] = useState("");
  const [rowData, setRowData] = useState([]);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user,translate } = useContext(UserContext);

  const [BranchData, setBranchData] = useState([]);

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
      label: "Branch Name",
    },
    {
      id: "branchEmail",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    {
      id: "branchPointOfContact",
      numeric: false,
      disablePadding: true,
      label: "Point of Contact",
    },
    {
      id: "contact",
      numeric: false,
      disablePadding: true,
      label: "Branch Contact",
    },
    {
      id: "accStatus",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
    {
      id: "actions",
      view: <Eye />,
      edit: <Edit />,
      delete: <Trash />,
      numeric: false,
      label: "Actions",
    },
  ];

  //API call for fetching all branches
  const { data, status } = useQuery(
    ["fetchBranches"],
    () => {
      return axios.get(
        `${
          backendUrl + `/api/ngo/listAllBranches`
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
            name: obj?.branchName,
            location: obj?.branchLocation,
            description: obj?.branchDescription,
            contact: obj?.branchContact || "N/A",
            accStatus: obj?.branchStatus,
            image: obj?.branchPicture ? obj?.branchPicture : ngoDefault,
            branchPointOfContact: obj?.branchPointOfContact,
            branchEmail: obj?.branchEmail,
            branchContact: obj?.branchContact,
            branchStartTime:obj?.branchStartTime,
            branchEndTime:obj?.branchEndTime,
          };
          return branch;
        });
        setRowData(data);
        setTotalPages(Math.ceil(data?.length / 10));

        // setTotalPages(response.data.totalPages);
      },
    }
  );

  //API call for changing user status
  const handleChangeStatus = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/ngo/editBranch"}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        navigate(routeNames.ngoAdmin.viewBranches);
        showNotification({
          title: translate( "Status Updated"),
          message: translate("Branch Status changed Successfully!"),
          color: "green.0",
        });
        setOpenDeleteModal(false);
        queryClient.invalidateQueries("fetchBranches");
      },
      onError: (res) => {
        showNotification({
          title: "Error",
          message: "Something Went Wrong!",
          color: "red.0",
        });
      },
    }
  );

  //API call for deleting user
  const handleDeleted = () => {
    handleChangeStatus.mutate({
      branchId: deleteID,
      branchStatus: "deleted",
    });
  };

  const filteredItem = useMemo(() => {
    let filtered = rowData.filter((item) => {
      if (filter === "") {
        return item.name.toLowerCase().includes(search.toLowerCase());
      } else
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          item.accStatus === filter
        );
    });
    
    setPage(1)
    setTotalPages(Math.ceil(filtered?.length / 10));
    const a = filtered.map((item, ind) => {
      return {
        ...item,
        sr: ind + 1,
      };
    });
    return a;
    // return filtered;
  }, [rowData, search, filter]);

  const Paginated = useMemo(() => {
    if (activePage === 1) {
      return filteredItem.slice(0, 10);
    } else {
      let a = (activePage - 1) * 10;
      return filteredItem.slice(a, a + 10);
    }
  }, [activePage, filteredItem]);

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"View Branches"} />

      <Container className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={5} lg={5} md={6}>
            <InputField
              placeholder="Search"
              leftIcon="search"
              pb="0"
              value={search}
              onChange={(v) => setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={3} md={3}>
            <SelectMenu
              placeholder="Filter by Status"
              pb="0px"
              value={filter}
              setData={setFilter}
              data={[
                { label: "All", value: "" },
                { label: "Active", value: "active" },
                { label: "InActive", value: "inactive" },
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
          <Grid.Col sm={6} lg={3} md={3} style={{ textAlign: "end" }}>
            <Button
              label={"Add Branch"}
              bg={true}
              leftIcon={"plus"}
              styles={{ float: "right" }}
              onClick={() => navigate(routeNames.ngoAdmin.addBranch)}
            />
          </Grid.Col>
        </Grid>
        {status == "loading" ? (
          <Loader />
        ) : (
          <Table
            headCells={headerData}
            rowData={Paginated}
            setViewModalState={setOpenViewModal}
            setViewModalData={setViewModalData}
            onStatusChange={handleChangeStatus.mutate}
            setDeleteData={setDeleteID}
            setDeleteModalState={setOpenDeleteModal}
            setReportData={setBranchData}
            setEditBranch={true}
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
        loading={handleChangeStatus.isLoading}
        label={translate("Are you Sure?")}
        message="Do you really want to delete these records? This process cannot be undone."
      />
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="Branch Details"
      >
        <ViewBranchModal id={viewModalData} reportData={BranchData} />
      </ViewModal>
    </Container>
  );
};
