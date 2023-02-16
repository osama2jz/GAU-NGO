import {
  Grid,
  Avatar,
  SimpleGrid,
  Container,
  Text,
  Group,
} from "@mantine/core";
import { useStyles } from "./styles";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import userlogo from "../../../assets/teacher.png";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "@mantine/form";
import InputField from "../../../Components/InputField";
import Button from "../../../Components/Button";
import Loader from "../../../Components/Loader";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

function ViewUserModal({ id ,setOpenEditModal}) {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [userdata, setUserData] = useState();


  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      userId:"",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validate: {
      firstName: (value) =>
        /^[a-zA-Z]{3,12}$/.test(value)
          ? null
          : "Please enter first name and it should be between 3 to 12 characters",
      lastName: (value) =>
        /^[a-zA-Z]{3,12}$/.test(value)
          ? null
          : "Please enter last name and it should be between 3 to 12 characters",
      phoneNumber: (value) =>
        value?.length < 8 ? "Please enter phone number" : null,
    },
  });

  const { data, status } = useQuery(
    "fetchUserbyId",
    () => {
      return axios.get(`${backendUrl + `/api/user/listSingleUser/${id}`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        // setRowData(response.data.data);
        setUserData(response.data.data);
        form.setFieldValue("userId", response.data.data?._id);
        form.setFieldValue("firstName", response.data.data?.firstName);
        form.setFieldValue("lastName", response.data.data?.lastName);
        form.setFieldValue("phoneNumber", response.data.data?.phoneNumber);
      },
    }
  );

  const updateUser = useMutation((values) => {
      return axios.post(`${backendUrl + "/api/user/edit"}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        setOpenEditModal(false)
        showNotification({
          title: "User Updated Successfully!",
          message: "User Detail Updated Successfully!",
          color: "green",
        });
        // navigate(routeNames.socialWorker.allUsers);
        queryClient.invalidateQueries("fetchUser");
      },
    }
  );

  if (status === "loading") {
    return <Loader minHeight="100%"/>;
  }
  return (
    <Container>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => updateUser.mutate(values))}
      >
        <InputField
          label="First Name"
          placeholder="first name"
          form={form}
          validateName="firstName"
        />
        <InputField
          label="Last Name"
          required={true}
          placeholder="last name"
          form={form}
          validateName="lastName"
        />
        <InputField
          label="Phone Number"
          required={true}
          placeholder="phoneNumber"
          form={form}
          validateName="phoneNumber"
        />
        <Group position="right" mt="md">
          <Button
            label={"Save Update"}
            primary={true}
            className={classes.btn}
            type="submit"
          />
        </Group>
      </form>
    </Container>
  );
}

export default ViewUserModal;
