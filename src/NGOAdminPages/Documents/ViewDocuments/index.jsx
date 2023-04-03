import { Container, Grid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import DeleteModal from "../../../Components/DeleteModal";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import Table from "../../../Components/Table";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

export const ViewDocuments = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [rowData, setRowData] = useState([]);
  const [editDoc, setEditDoc] = useState();
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
      label: "Document Title",
    },
    {
      id: "expiryDate",
      numeric: false,
      disablePadding: true,
      label: "Expiry Date",
    },
    {
      id: "file",
      numeric: false,
      disablePadding: true,
      label: "View File",
    },
    {
      id: "actions",
      delete: <Trash />,
      numeric: false,
      label: "Actions",
    },
  ];

  //API call for fetching all documents
  const { data, status } = useQuery(
    "fetchDocumentsAll",
    () => {
      return axios.get(`${backendUrl + `/api/lookup/listGeneralDocuments`}`, {
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
            name: obj?.documentTitle,
            expiryDate: obj?.expiryDate
              ? new moment(obj?.expiryDate).format("DD MMM YYYY")
              : "No Expiry Date",
            file: obj?.documentURL,
            createdDate: new moment(obj?.createdDate).format("DD MMM YYYY"),
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
      return axios.get(
        `${backendUrl + `/api/lookup/deleteGeneralDocument/${deleteID}`}`,
        {},
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
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
        setOpenDeleteModal(false);
        queryClient.invalidateQueries("fetchDocumentsAll");
      },
    }
  );

  const filteredItems = rowData?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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
              value={search}
              onChange={(v) => setSearch(v.target.value)}
              onKeyDown={(v) => v.key === "Enter" && setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={1} md={3} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              onClick={() => {
                setSearch("");
              }}
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
            rowData={filteredItems}
            setDeleteData={setDeleteID}
            setDeleteModalState={setOpenDeleteModal}
            setEditDoc={setEditDoc}
            editDoc={editDoc}
          />
        )}
      </Container>
      <DeleteModal
        opened={openDeleteModal}
        setOpened={setOpenDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        loading={handleDeleteDocument.isLoading}
        onDelete={handleDeleteDocument.mutate}
        label="Are you Sure?"
        message="Do you really want to delete these records? This process cannot be undone."
      />
    </Container>
  );
};
