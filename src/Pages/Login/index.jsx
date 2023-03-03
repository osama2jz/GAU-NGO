import {
  Anchor,
  Checkbox,
  Container,
  Divider,
  Grid,
  Group,
} from "@mantine/core";
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
import imgg from "../../assets/login.png";

const Login = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
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
          window.location.href = routeNames.general.dashboard;
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
    <Container
      className={classes.container}
      size="xl"
      p={"0px"}
      m="0px"
      maw={"100%"}
    >
      <Container
        w={"50%"}
        size="xl"
        p={"0px"}
        m="0px"
        className={classes.formC}
      >
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
          <Button label={"Login"} bg={true} type="submit" w={"100%"} size="lg"/>
          <Grid align={"center"} justify="space-between" mt="2px">
            <Grid.Col md="6">
              <Checkbox
                label="Remember me"
                styles={{ input: classes.checkBoxInput }}
              />
            </Grid.Col>
            <Grid.Col md="5">
              <Anchor>Forgot Password?</Anchor>
            </Grid.Col>
          </Grid>
          <Divider
            label="OR"
            labelPosition="center"
            color={"rgb(0,0,0,0.2)"}
            my="md"
          />
          <Button
            label={"Sign in with Google"}
            leftIcon="google"
            size="lg"
            w={"100%"}
            bg={true}
            styles={{
              backgroundColor: "white",
              color: "rgb(0,0,0,0.8)",
              border: "1px solid gray",
            }}
          />
        </form>
      </Container>
      <Container
        w={"50%"}
        bg={"rgb(225, 245, 250, 0.6)"}
        size="xl"
        p={"0px"}
        m="0px"
        className={classes.img}
      >
        <img src={imgg} width="60%" />
      </Container>
    </Container>
  );
};

export default Login;
