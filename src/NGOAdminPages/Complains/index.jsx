import { Container, Grid } from "@mantine/core";
import axios from "axios";
import moment from "moment";
import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { Eye } from "tabler-icons-react";
import Button from "../../Components/Button";
import ContainerHeader from "../../Components/ContainerHeader";
import InputField from "../../Components/InputField";
import Loader from "../../Components/Loader";
import Pagination from "../../Components/Pagination";
import SelectMenu from "../../Components/SelectMenu";
import Table from "../../Components/Table";
import ViewModal from "../../Components/ViewModal/viewUser";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import routeNames from "../../Routes/routeNames";
import ReplyModal from "./ComplainReply";
import { useStyles } from "./styles";
import ViewComplaintModal from "./ViewComplaintModal";

export const ViewComplains = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const [viewModalData, setViewModalData] = useState();
  const [replyModalId, setReplyModalId] = useState(null);

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
      id: "reply",
      numeric: false,
      disablePadding: true,
      label: "Reply",
    },
    {
      id: "actions",
      view: <Eye />,
      numeric: false,
      label: "Actions",
    },
  ];

  //API call for fetching all donations
  const { data, status } = useQuery(
    ["fetchAllComplains"],
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
            reply: obj?.reply,
            description: obj?.description,
          };
          return branch;
        });
        setRowData(data);
        setTotalPages(Math.ceil(data?.length / 10));
      },
    }
  );

  const filteredItem = useMemo(() => {
    let filtered = rowData.filter((item) => {
      if (filter === "") {
        return item.name.toLowerCase().includes(search.toLowerCase());
      } else if (filter === "responded") {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) && item.reply
        );
      } else {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) && !item.reply
        );
      }
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
    if (activePage === 1) {
      return filteredItem.slice(0, 10);
    } else {
      let a = (activePage - 1) * 10;
      return filteredItem.slice(a, a + 10);
    }
  }, [filteredItem, activePage]);
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
              onChange={(v) => setSearch(v.target.value)}
              onKeyDown={(v) => v.key === "Enter" && setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm={3}>
            <SelectMenu
              placeholder="Filter by Status"
              pb="0px"
              value={filter}
              setData={setFilter}
              data={[
                { label: "All", value: "" },
                { label: "Responded", value: "responded" },
                { label: "Non-Responded", value: "nonResponded" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={3} lg={1} md={3} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              onClick={() => {
                setFilter("");
                setSearch("");
              }}
            />
          </Grid.Col>

          <Grid.Col sm={3} ml="auto">
            {user.role === "User" && (
              <Button
                label={"Add Complain"}
                bg={true}
                leftIcon={"plus"}
                styles={{ float: "right" }}
                onClick={() => navigate(routeNames.user.addComplaint)}
              />
            )}
          </Grid.Col>
        </Grid>
        {status == "loading" ? (
          <Loader />
        ) : (
          <Table
            headCells={headerData}
            rowData={paginated}
            setViewModalState={setOpenViewModal}
            setOpenReplyModal={setOpenReplyModal}
            setReplyModalId={setReplyModalId}
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
        title="Complaint Details"
      >
        <ViewComplaintModal id={viewModalData} reportData={reportData} />
      </ViewModal>
      <ReplyModal
        setOpenReplyModal={setOpenReplyModal}
        openReplyModal={openReplyModal}
        replyModalId={replyModalId}
      />
    </Container>
  );
};
