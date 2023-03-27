import { Anchor, Checkbox, Divider, Flex, Grid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import { GoogleLogin } from "@react-oauth/google";
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
      <ContainerHeader label={"Log in"} />
      <InputField
        placeholder={"Email"}
        type="email"
        form={form}
        validateName="email"
      />
      <PassInput placeholder={"Password"} form={form} validateName="password" />
      <Button
        label={"Login"}
        bg={true}
        type="submit"
        w={"100%"}
        size="lg"
        loading={handleLogin.status === "loading"}
      />
      <Flex justify="space-between" mt="md">
        <Checkbox label="Remember me" />
        <Anchor onClick={()=>navigate(routeNames.general.forgetPassword)}>Forgot Password?</Anchor>
      </Flex>
      <Divider
        label="OR"
        labelPosition="center"
        color={"rgb(0,0,0,0.5)"}
        my="md"
      />
      <GoogleLogin
      // onSuccess={async (credentialResponse) => {
      //   axios
      //     .post(backendUrl + "/auth/signin-with-google", {
      //       credentials: credentialResponse.credential,
      //     })
      //     .then((res) => {
      //       localStorage.setItem("token", res.data.data.token);
      //       setUser(res.data.data);
      //       navigate(routes.dashboard);
      //     })
      //     .catch((err) => {
      //       toast.error(err.response.data.message);
      //     });
      // }}
      // onError={(res) => {
      //   toast.error("Something went wrong! Please Try Again.");
      // }}
      />
      <Text align="center" mt={"sm"}>
        Don't have an Account?{" "}
        <Anchor onClick={() => navigate(routeNames.general.signup)}>
          Register Here
        </Anchor>
      </Text>
    </form>
  );
};
export default Login;
