import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import ContainerHeader from "../../Components/ContainerHeader";
import InputField from "../../Components/InputField";
import PassInput from "../../Components/PassInput";
import { backendUrl } from "../../constants/constants";
import routeNames from "../../Routes/routeNames";
import { useStyles } from "./styles";

const Login = () => {
  const { classes } = useStyles();
  const navigate =useNavigate()
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Enter a valid email",
      password: (value) => (value?.length < 1 ? "Enter password" : null),
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
            window.location.href=routeNames.general.dashboard;
        } else {
          showNotification({
            title: "Invalid Credentials",
            message: "Please Enter correct email and password to login.",
            color: "red.0",
          });
        }
        // navigate(routeNames.socialWorker.allUsers);
      },
    }
  );

  return (
    <Container className={classes.container}>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleLogin.mutate(values))}
      >
        <ContainerHeader label={"Log in"} />
        <InputField
          placeholder={"Email"}
          type="email"
          form={form}
          validateName="email"
        />
        <PassInput
          placeholder={"Password"}
          form={form}
          validateName="password"
        />
        <Button label={"Login"} primary={true} type="submit" />
      </form>
    </Container>
  );
};

export default Login;
