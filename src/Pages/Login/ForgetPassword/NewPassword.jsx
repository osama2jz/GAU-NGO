import { Anchor, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import PassInput from "../../../Components/PassInput";
import { backendUrl } from "../../../constants/constants";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "../styles";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const NewPassword = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { translate } = useContext(UserContext);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      password: "",
      password_confirmation: "",
      otp: state?.otp,
    },

    validate: {
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
          value
        ) ? null : (
          <ul>
            {translate(" Password must contain 8 to 15 characters with")}
            <li>{translate("At least one captial alphabet.")}</li>
            <li>{translate("at least one small alphabet.")}</li>
            <li>
              {translate("at least one digit and one special character.")}
            </li>
            <li>{translate("at least one special character.")}</li>
          </ul>
        ),
      password_confirmation: (value, values) =>
        value !== values?.password ? translate("Passwords did not match") : null,
    },
  });

  const handleReset = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/user/changePassword"}`, values);
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          navigate(routeNames.general.login);
          showNotification({
            title: "Password Changed",
            message: response.data.message,
            color: "green.0",
          });
        } else {
          showNotification({
            title: "Error",
            message: response.data.message,
            color: "red.0",
          });
        }
      },
    }
  );
  return (
    <form
      className={classes.form}
      onSubmit={form.onSubmit((values) => handleReset.mutate(values))}
    >
      <ContainerHeader label={"Reset Password"} />
      <PassInput
        placeholder={"Enter New Password"}
        form={form}
        validateName="password"
      />
      <PassInput
        placeholder={"Confirm Password"}
        form={form}
        validateName="password_confirmation"
      />
      <Button
        label={"Reset"}
        bg={true}
        type="submit"
        w={"100%"}
        size="lg"
        loading={handleReset.isLoading}
      />
      <Flex justify="center" mt="md">
        <Anchor onClick={() => navigate(routeNames.general.login)}>
          Return To Login
        </Anchor>
      </Flex>
    </form>
  );
};
export default NewPassword;
