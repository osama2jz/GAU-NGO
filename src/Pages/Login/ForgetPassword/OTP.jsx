import { Anchor, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import { backendUrl } from "../../../constants/constants";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "../styles";

const OTP = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Enter a valid email",
    },
  });

  const handleLogin = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/user/signin"}`, values);
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          localStorage.setItem("userData", JSON.stringify(response.data));
          window.location.href = routeNames.general.dashboard;
        } else {
          showNotification({
            title:
              response.data.message === "Verification Pending"
                ? response.data.message
                : "Invalid Credentials",
            message:
              response.data.message === "Verification Pending"
                ? "Your Account verification is pending."
                : "Please Enter correct email and password to login.",
            color: "red.0",
          });
        }
        // navigate(routeNames.socialWorker.allUsers);
      },
    }
  );
  return (
    <form
      className={classes.form}
      onSubmit={form.onSubmit((values) => handleLogin.mutate(values))}
    >
      <ContainerHeader label={"Verify OTP"} />
      <InputField
        placeholder={"Enter OTP"}
        type="email"
        form={form}
        validateName="email"
      />
      <Button
        label={"Continue"}
        bg={true}
        type="submit"
        w={"100%"}
        size="lg"
        loading={handleLogin.status === "loading"}
      />
      <Flex justify="center" mt="md">
        <Anchor onClick={() => navigate(routeNames.general.login)}>
          Return To Login
        </Anchor>
      </Flex>
    </form>
  );
};
export default OTP;
