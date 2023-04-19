import { Container, Flex, Group, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import Button from "../../Components/Button";
import PassInput from "../../Components/PassInput";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import routeNames from "../../Routes/routeNames";
import { useStyles } from "./styles";

export const UpdatePassword = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user, translate } = useContext(UserContext);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      oldPassword: (value) => (value ? null : "Please enter old password."),
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
          value
        )
          ? null
          : "Password must contain 8 to 15 characters with at least one captial, one small, one digit and one special character.",
      confirmPassword: (value, values) =>
        value !== values?.password ? "Passwords did not match" : null,
    },
  });

  const handleUpdate = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/user/changePassword"}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Password Updated",
            message: "Password updated Successfully!",
            color: "green.0",
          });
          navigate(routeNames.socialWorker.dashboard);
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

  return (
    <Container
      className={classes.container}
      // p={30}
      shadow="sm"
      mt="sm"
      size={"xl"}
    >
      <form onSubmit={form.onSubmit((values) => handleUpdate.mutate(values))}>
        <SimpleGrid>
          <PassInput
            label={"Old Password"}
            form={form}
            validateName="oldPassword"
          />
          <PassInput
            label={"New Password"}
            form={form}
            validateName="password"
          />
          <PassInput
            label={"Confirm Password"}
            form={form}
            validateName="confirmPassword"
          />
        </SimpleGrid>
        <Group position="right" mt="sm">
          <Button
            label="Cancel"
            onClick={() => navigate(routeNames.socialWorker.dashboard)}
          />
          <Button
            label="Update Password"
            primary={true}
            type="submit"
            loading={handleUpdate.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
