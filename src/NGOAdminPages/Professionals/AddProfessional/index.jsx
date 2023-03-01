import { Anchor, Container, Grid, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import PassInput from "../../../Components/PassInput";
import SelectMenu from "../../../Components/SelectMenu";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

export const AddProfessional = () => {
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
      userType: "",
    },

    validate: {
      userType: (value) =>
        value?.length < 1 ? "Please select Professional type" : null,
      firstName: (value) =>
        /^[a-zA-Z ]{2,15}$/.test(value)
          ? null
          : "Please enter first name between 2 to 15 characters.",
      lastName: (value) =>
        /^[a-zA-Z ]{2,15}$/.test(value)
          ? null
          : "Please enter last name between 2 to 15 characters",

      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Please Enter a valid email",

      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
          value
        )
          ? null
          : "Password must contain 8 to 15 characters with at least one captial, one small, one digit and one special character.",
      phoneNumber: (value) =>
        value?.length < 8 || value?.length > 12
          ? "Please enter a valid phone number"
          : null,
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
        if (response.data.status) {
          showNotification({
            title: "User Added",
            message: "New User added Successfully!",
            color: "green.0",
          });
          navigate(routeNames.socialWorker.allUsers);
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

  if (handleAddUser.isLoading) {
    return <Loader />;
  }

  if (handleAddUser.isError) {
    showNotification({
      title: "Error",
      message: "Something went wrong",
      color: "red",
    });
  }

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"Add Professional"} />

      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleAddUser.mutate(values))}
      >
        <SelectMenu
          data={[
            { label: "Lawyer", value: "laywer" },
            { label: "Psychologist", value: "psychologist" },
            { label: "Social Worker", value: "socialWorker" },
          ]}
          placeholder="Select role"
          label="Professional Type"
          pb="sm"
          form={form}
          validateName="userType"
        />
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
        <Grid>
          <Grid.Col sm={6}>
            <InputField
              label="Email"
              required={true}
              placeholder="xyz@gmail.com"
              form={form}
              validateName="email"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <InputField
              type="number"
              label="Phone Number"
              required={true}
              placeholder="+123456789"
              form={form}
              validateName="phoneNumber"
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col sm={6}>
            <PassInput
              label="Password"
              required={true}
              placeholder="*******"
              form={form}
              validateName="password"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <PassInput
              label="Confirm Password"
              required={true}
              placeholder="*******"
              form={form}
              validateName="confirmPassword"
            />
          </Grid.Col>
        </Grid>
        <Group position="right" mt="sm">
          <Button
            label="Cancel"
            onClick={() => navigate(routeNames.ngoAdmin.viewProfessionals)}
          />
          <Button
            label="Add Professional"
            leftIcon={"plus"}
            primary={true}
            type="submit"
          />
        </Group>
      </form>
    </Container>
  );
};
