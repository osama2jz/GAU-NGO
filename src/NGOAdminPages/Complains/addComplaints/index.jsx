import { Avatar, Container, Grid, Group, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
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


export const AddComplains = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(UserContext);
  const [professionalsData,setProfessionalsData]=useState([])
  const [professional,setProfessional]=useState()

  console.log("professional",professional)
 
 //API call for fetching all professionals
 const { data1, status1 } = useQuery(
  ["fetchProfessionals", activePage, search, filter],
  () => {
    return axios.get(`${backendUrl + `/api/user/listUsers/all/0/0`}`, {
      headers: {
        "x-access-token": user.token,
      },
    });
  },
  {
    onSuccess: (response) => {
      let data = response.data?.data?.map((obj, ind) => {
        let user = {
          value: obj._id.toString(),
          label: obj?.firstName + " " + obj?.lastName,
          // userType:
          //   obj.userType === "socialWorker"
          //     ? "Social Worker"
          //     : obj?.userType === "psychologist"
          //     ? "Psychologist"
          //     : obj?.userType === "lawyer"
          //     ? "Lawyer"
          //     : "",
          email: obj.email,
          image:obj?.profileImage,

        };
        return user;
      });
      setProfessionalsData(data);
     
    },
  }
);

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

  console.log("professionalsData",professionalsData)
  
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

  const SelectItem = ({ image, label, email, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar radius={"50%"} src={image || userImage} />
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {email}
          </Text>
        </div>
      </Group>
    </div>
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
        <SimpleGrid cols={2}>
        <InputField
          label="Subject"
          placeholder="Subject"
          form={form}
          validateName="subject"
        />
          {/* {status === "loading" ? (
          <Loader minHeight="40px"/>
        ) : ( */}
          <SelectMenu
            searchable={true}
            itemComponent={SelectItem}
            placeholder="Enter User name or Id"
            clearable={true}
            setData={setProfessional}
            label="Search Professional"
            data={professionalsData}
            value={professional}
            // disabled={editId ? true : false}
          />
        {/* )} */}
        </SimpleGrid>
     
     
        <TextArea
        label="Description"
        placeholder="Complaint Description"
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
