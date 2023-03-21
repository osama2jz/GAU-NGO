import {
  Avatar,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
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
import userImage from "../../../assets/teacher.png";

export const AddDonations = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(UserContext);
  const [professionalsData, setProfessionalsData] = useState([]);
  const [professional, setProfessional] = useState();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      userId:"",
      amount: "",
      description: "",
    },

    validate: {
      // amount: (value) =>
      //   /^[a-zA-Z ]{2,40}$/.test(value) ? null : "Please enter amount",
      description: (value) =>
        value?.length < 2 ? "Please enter description" : null,
    },
  });

  console.log("professionalsData", professionalsData);

  const handleAddComplaint = useMutation(
    (values) => {
      let data={
        ...values,
        userId:user.id

      }
      return axios.post(`${backendUrl + "/api/donation/donate"}`, data, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Amount Donated ",
            message: "Amount Donated Successfully!",
            color: "green.0",
          });
          navigate(routeNames.ngoAdmin.viewDonations);
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

  // if (handleAddComplaint.isLoading) {
  //   return <Loader />;
  // }
  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"Make Donation"} />
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => 
    
          
          handleAddComplaint.mutate(values))}
        
      >
        <Container className={classes.innerContainer} size="xl">
          <InputField
            label="Amount"
            placeholder="Amount"
            form={form}
            type={"number"}
            validateName="amount"
          />

          <TextArea
            label="Description"
            placeholder="Description"
            form={form}
            validateName="description"
          />
          <Group position="right" mt="sm">
            <Button label="Cancel" onClick={() => form.reset()} />
            <Button label={"Donate"} bg={true} type="submit" leftIcon={"dollar"}/>
          </Group>
        </Container>
      </form>
    </Container>
  );
};
