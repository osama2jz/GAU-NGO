import { Container, Grid, Group, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Checks, Edit, Eye, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";

import ContainerHeader from "../../../Components/ContainerHeader";
import DeleteModal from "../../../Components/DeleteModal";
import EditModal from "../../../Components/EditModal/editModal";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import TextArea from "../../../Components/TextArea";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
// import routeNames from "../../../../Routes/routeNames";
import { useStyles } from "./styles";


export const AddComplains = () => {
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

 

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      subject: "",
      description: "",
    },

    validate: {
      subject: (value) =>
        /^[a-zA-Z ]{2,40}$/.test(value)
          ? null
          : "Please enter subject of your complaint.",
        description: (value) =>
        value?.length < 2 ? "Please enter description" : null,
     
    },
  });

  
  const handleAddComplaint = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/complaints/postComplaint"}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Complaint Added ",
            message: "Complaint added Successfully!",
            color: "green.0",
          });
          navigate(routeNames.ngoAdmin.complaints);
        } else {
          showNotification({
            title: "Failed",
            message: response?.data?.message,
            color: "red.0",
          });
        }
      },
    }
  );

  if (handleAddComplaint.isLoading) {
    return <Loader />;
  }
  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"Add Complaint"} />
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleAddComplaint.mutate(values))}
      >
      <Container className={classes.innerContainer} size="xl">
     
      <InputField
          label="Subject"
          placeholder="subject"
          form={form}
          validateName="subject"
        />
        <TextArea
        label="Description"
        placeholder="description"
        form={form}
        validateName="description"
        />
         <Group position="right" mt="sm">
          <Button
            label="Cancel"
           onClick={()=>form.reset()}
           
          />
           <Button
        label={"Add Complaint"}
        bg={true}
        type="submit"
        />
        </Group>
      
      </Container>
      </form>
     
    </Container>
  );
};
