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
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const ForgetPassword = () => {
  const { classes } = useStyles();
  const {translate } = useContext(UserContext);
  const navigate = useNavigate();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : translate("Enter a valid email"),
    },
  });

  const handleLogin = useMutation(
    (values) => {
      return axios.post(
        `${backendUrl + "/api/user/sendUserPasswordResetEmail"}`,
        values
      );
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          // localStorage.setItem("userData", JSON.stringify(response.data));
          navigate(routeNames.general.otp, { state: { allowed: true } });
          showNotification({
            title: translate("Email Verified"),
            message: translate(response.data.message),
            color: "green.0",
          });
        } else {
          showNotification({
            title: translate("Invalid Email"),
            message: translate(response.data.message),
            color: "red.0",
          });
        }
      },
    }
  );
  return (
    <form
      className={classes.form}
      onSubmit={form.onSubmit((values) => handleLogin.mutate(values))}
    >
      <ContainerHeader label={"Reset Password"} />
      <InputField
        placeholder={"Enter Email"}
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
          {translate("Return To Login")}
        </Anchor>
      </Flex>
    </form>
  );
};
export default ForgetPassword;
