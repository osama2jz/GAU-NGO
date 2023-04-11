import { Container, Grid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { Edit, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import DeleteModal from "../../../Components/DeleteModal";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import Table from "../../../Components/Table";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

export const ViewDictionary = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const [deleteID, setDeleteID] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [rowData, setRowData] = useState([]);
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
      id: "actualWord",
      numeric: false,
      disablePadding: true,
      label: "Actual Word",
    },
    {
      id: "translated",
      numeric: false,
      disablePadding: true,
      label: "Translated Text",
    },
    {
      id: "language",
      numeric: false,
      disablePadding: true,
      label: "Language",
    },
    {
      id: "actions",
      edit: <Edit />,
      delete: <Trash />,
      numeric: false,
      label: "Actions",
    },
  ];

  //API call for fetching dictionary
  const { data, status } = useQuery(
    ["fetchDictionary"],
    () => {
      return axios.get(
        `${backendUrl + `/api/translation/list/6429912c360576272cf4acfe`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        const keys = Object.keys(response.data?.data);
        const values = Object.values(response.data?.data);
        const data = keys.map((key, index) => ({
          sr: index + 1,
          actualWord: key,
          language: "Spanish",
          translated: values[index],
        }));
        setRowData(data);
        setTotalPages(Math.ceil(data?.length / 10));
      },
    }
  );

  const filteredItems = useMemo(() => {
    let filtered = rowData.filter((item) => {
      return (
        item.actualWord.toLowerCase().includes(search.toLowerCase()) ||
        item.translated.toLowerCase().includes(search.toLowerCase())
      );
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
  }, [rowData, search, filter]);

  const paginated = useMemo(() => {
    if (activePage == 1) {
      return filteredItems.slice(0, 10);
    } else {
      return filteredItems.slice((activePage - 1) * 10, activePage * 10);
    }
  }, [activePage, filteredItems]);

  //API call for delete translation
  const handleDelete = useMutation(
    (values) => {
      return axios.post(
        `${backendUrl + "/api/translation/edit"}`,
        { translationId: deleteID, status: "deleted" },
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Deleted",
          message: "Dictionary word deleted successfully!",
          color: "green.0",
        });
        setOpenDeleteModal(false);
        queryClient.invalidateQueries("fetchDictionary");
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

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"View Dictionary"} />

      <Container className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField
              placeholder="Search word"
              leftIcon="search"
              pb="0"
              onChange={(v) => setSearch(v.target.value)}
              onKeyDown={(v) => v.key === "Enter" && setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={1} md={3} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              onClick={() => {
                setFilter("all");
                setSearch("");
              }}
            />
          </Grid.Col>

          <Grid.Col sm={3} ml="auto">
            <Button
              label={"Add Dictionary"}
              bg={true}
              leftIcon={"plus"}
              styles={{ float: "right" }}
              onClick={() => navigate(routeNames.ngoAdmin.addDictionary)}
            />
          </Grid.Col>
        </Grid>
        {status == "loading" ? (
          <Loader />
        ) : (
          <Table
            headCells={headerData}
            rowData={paginated}
            setReportData={true}
            setDeleteData={setDeleteID}
            setDeleteModalState={setOpenDeleteModal}
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
        onDelete={handleDelete.mutate}
        loading={handleDelete.isLoading}
        label="Are you Sure?"
        message="Do you really want to delete these records? This process cannot be undone."
      />
    </Container>
  );
};
