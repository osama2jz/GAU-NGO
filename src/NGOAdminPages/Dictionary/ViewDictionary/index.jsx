import { Container, Grid } from "@mantine/core";
import axios from "axios";
import moment from "moment";
import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { Edit, Eye, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import ViewUserModal from "./ViewUserModal";

export const ViewDictionary = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [viewModalData, setViewModalData] = useState();
  const [rowData, setRowData] = useState([]);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(UserContext);

  const [reportData, setReportData] = useState([]);

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
      id: "actions",
      edit: <Edit />,
      delete: <Trash />,
      numeric: false,
      label: "Actions",
    },
  ];

  //API call for fetching all donations
  const { data, status } = useQuery(
    ["fetchDonations"],
    () => {
      return axios.get(
        `${backendUrl + `/api/translation/list/64299127360576272cf4acfc`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
          let lang = {
            id: obj._id,
            language: obj?.language,
            actualText: obj?.actualText,
            translated: obj?.translatedText,
          };
          return lang;
        });
        setRowData(data);
        setTotalPages(Math.ceil(data?.length / 10));
      },
    }
  );  

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
  }, [rowData, search, filter]);

  const paginated = useMemo(() => {
    if (activePage == 1) {
      return filteredItems.slice(0, 10);
    } else {
      return filteredItems.slice((activePage - 1) * 10, activePage * 10);
    }
  }, [activePage, filteredItems]);

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"View Donations"} />

      <Container className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField
              placeholder="Search"
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
            {user.role === "User" ||
              (user.role === "Admin" && (
                <Button
                  label={"Add Donation"}
                  bg={true}
                  leftIcon={"plus"}
                  styles={{ float: "right" }}
                  onClick={() => navigate(routeNames.user.addDonation)}
                />
              ))}
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
            setReportData={setReportData}
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

      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="Donation Details"
      >
        {/* <ViewUser id={viewModalData}/> */}
        <ViewUserModal id={viewModalData} reportData={reportData} />
      </ViewModal>
    </Container>
  );
};
