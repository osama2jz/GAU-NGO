import {
  Anchor,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";
import Button from "../../../Components/Button";
import InputField from "../../../Components/InputField";
import PassInput from "../../../Components/PassInput";
import { useStyles } from "./styles";
import User from "../../../assets/add-user.png";
import SubmitModal from "./SubmitEmail";
import { axiosPost } from "../../../axios/axios";
import { useNavigate } from "react-router-dom";
import routeNames from "../../../Routes/routeNames";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "react-query";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import Loader from "../../../Components/Loader";
import ContainerHeader from "../../../Components/ContainerHeader";

export const AddUser = () => {
  const { classes } = useStyles();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      userType: "user",
    },

    validate: {
      firstName: (value) =>
        value.length < 1 ? "Please enter first name" : null,
      lastName: (value) =>
        value?.length < 1 ? "Please enter last name" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value?.length < 8 ? "Password must at least have 8 characters" : null,
      phone: (value) =>
        value?.length < 8 ? "Please enter phone number" : null,
      confirmPassword: (value, values) =>
        value !== values?.password ? "Passwords did not match" : null,
    },
  });

  const handleAddUser = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/user/create"}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        navigate(routeNames.socialWorker.allUsers);
        showNotification({
          title: "User Added",
          message: "New User added Successfully!",
          color: "green",
        });
      },
    }
  );

  if (handleAddUser.isLoading) {
    return <Loader />;
  }

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"Add User"} />

      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleAddUser.mutate(values))}
      >
        <Grid>
          <Grid.Col sm={6}>
            <InputField
              label="First Name"
              required={true}
              placeholder="First Name"
              form={form}
              validateName="firstName"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <InputField
              label="Last Name"
              required={true}
              placeholder="Last Name"
              form={form}
              validateName="lastName"
            />
          </Grid.Col>
        </Grid>
        <InputField
          label="Email"
          required={true}
          placeholder="xyz@gmail.com"
          form={form}
          validateName="email"
        />
        <InputField
          label="Phone Number"
          required={true}
          placeholder="+123456789"
          form={form}
          validateName="phoneNumber"
        />
        <PassInput
          label="Password"
          required={true}
          placeholder="*******"
          form={form}
          validateName="password"
        />
        <PassInput
          label="Confirm Password"
          required={true}
          placeholder="*******"
          form={form}
          validateName="confirmPassword"
        />
        <Text pb={"sm"} size="sm">
          By pressing “Submit” I declare that i’ve read and agree to the{" "}
          <b>GAU</b> <Anchor color={"green"}>Terms and Conditions.</Anchor>
        </Text>
        <Group position="right" mt="sm">
          <Button
            label="Cancel"
            onClick={() => navigate(routeNames.socialWorker.allUsers)}
          />
          <Button
            label="Add User"
            leftIcon={"plus"}
            primary={true}
            type="submit"
          />
        </Group>
      </form>
      <SubmitModal opened={showModal} setOpened={setShowModal} />
    </Container>
  );
};
