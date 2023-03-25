import { Container, Grid, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Edit, Eye, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import DeleteModal from "../../../Components/DeleteModal";
import EditModal from "../../../Components/EditModal/editModal";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import EditUserModal from "./EditUserModal";
import { useStyles } from "./styles";
import ViewUserModal from "./ViewUserModal";
import { useMutation } from "react-query";
import { showNotification } from "@mantine/notifications";

export const ViewDocuments = () => {
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
  const { user } = useContext(UserContext);
  const [editDoc, setEditDoc] = useState();

  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    if (editDoc) {
      navigate(routeNames.ngoAdmin.addDocument, {
        state: {
          editdata: editDoc,
        },
      });
    }
  }, [editDoc]);

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
      label: "Document Name",
    },
    {
      id: "content",
      numeric: false,
      disablePadding: true,
      label: "Document Content",
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

  //API call for fetching all documents
  const { data, status } = useQuery(
    "fetchDocumentsAll",
    () => {
      return axios.get(`${backendUrl + `/api/lookup/listDocuments`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
          let doc = {
            id: obj._id,
            sr: ind + 1,
            name: obj?.lookupId?.lookupName,
            content: obj?.documentText,
            lookupId: obj?.lookupId?._id,
          };
          return doc;
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

  //API call for deleting document
  const handleDeleted = () => {
    handleDeleteDocument.mutate({
      documentId: deleteID,
      status: "deleted",
    });
    setOpenDeleteModal(false);
  };

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"View Documents"} />

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
          <Grid.Col sm={6} md={3}>
            <SelectMenu
              placeholder="Filter by Status"
              pb="0px"
              value={"all"}
              setData={setFilter}
              data={[
                { label: "All", value: "all" },
                { label: "Active", value: "active" },
                { label: "InActive", value: "inactive" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={3} ml="auto">
            <Button
              label={"Add Document"}
              bg={true}
              leftIcon={"plus"}
              styles={{ float: "right" }}
              onClick={() => navigate(routeNames.ngoAdmin.addDocument)}
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
            setDeleteData={setDeleteID}
            setDeleteModalState={setOpenDeleteModal}
            setReportData={setReportData}
            setEditDoc={setEditDoc}
            editDoc={editDoc}
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
        title={reportData?.name}
        size={"800px"}
      >
        <ViewUserModal id={viewModalData} reportData={reportData} />
      </ViewModal>
    </Container>
  );
};
