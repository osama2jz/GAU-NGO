import { Container, Grid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment/moment";
import { useContext, useEffect, useMemo, useState } from "react";
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
import Pagination from "../../../Components/Pagination";

export const ViewDocuments = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { classes } = useStyles();
  const { user, translate } = useContext(UserContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [rowData, setRowData] = useState([]);
  const [editDoc, setEditDoc] = useState();
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Created Date",
      translate: true,
    },
    {
      id: "expiryDate",
      numeric: false,
      disablePadding: true,
      label: "Expiry Date",
      translate: true,
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
              ? new moment(obj?.expiryDate).format("YYYY-MM-DD")
              : "No Expiry Date",
            file: obj?.documentURL,
            date: new moment(obj?.createdDate).format("YYYY-MM-DD"),
          };
          return doc;
        });
        setRowData(data);
        setTotalPages(Math.ceil(data?.length / 10));
      },
    }
  );

  //API call for deleting a document
  const handleDeleteDocument = useMutation(
    (values) => {
      return axios.get(
        `${backendUrl + `/api/lookup/deleteGeneralDocument/${deleteID}`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response?.data?.status) {
          showNotification({
            title: deleteID
              ? translate("Document Deleted")
              : translate("Document Created"),
            message: deleteID
              ? translate("Document Deleted Successfully")
              : translate("Document Updated Successfully!"),
            color: "green.0",
          });
          // navigate(routeNames.ngoAdmin.viewDocuments);
        } else {
          showNotification({
            title: translate("Failed"),
            message: deleteID
              ? translate("Failed to Delete")
              : translate("Failed to Update"),
            color: "red.0",
          });
        }
        setOpenDeleteModal(false);
        queryClient.invalidateQueries("fetchDocumentsAll");
      },
    }
  );

  // const filteredItems = rowData?.filter((item) =>
  //   item.name.toLowerCase().includes(search.toLowerCase())
  // );

  const filteredItems = useMemo(() => {
    let filtered = rowData.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

    setPage(1);
    setTotalPages(Math.ceil(filtered?.length / 10));
    const a = filtered.map((item, ind) => {
      return {
        ...item,
        sr: ind + 1,
      };
    });
    return a;
    // return filtered;
  }, [rowData, search]);

  const paginated = useMemo(() => {
    if (activePage == 1) {
      return filteredItems.slice(0, 10);
    } else {
      let a = (activePage - 1) * 10;

      return filteredItems.slice(a, a + 10);
    }
  }, [activePage, filteredItems]);

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
          <>
            <Table
              headCells={headerData}
              rowData={paginated}
              setDeleteData={setDeleteID}
              setDeleteModalState={setOpenDeleteModal}
              setEditDoc={setEditDoc}
              editDoc={editDoc}
            />
            {totalPages > 1 && (
              <Pagination
                activePage={activePage}
                setPage={setPage}
                total={totalPages}
                radius="xl"
              />
            )}
          </>
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
