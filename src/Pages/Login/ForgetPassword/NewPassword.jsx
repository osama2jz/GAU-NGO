import { Anchor, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useEffect } from "react";
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
import Loader from "../../../Components/Loader";

const NewPassword = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { translate } = useContext(UserContext);

  useEffect(() => {
    if (state && state.otp) {
    } else {
      navigate(-1);
    }
  }, [state]);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      password: "",
      password_confirmation: "",
      OTP: state?.otp,
    },

    validate: {
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
          value
        ) ? null : (
          <ul>
            {translate("Password must contain 8 to 15 characters with")}
            <li>{translate("At least one captial alphabet.")}</li>
            <li>{translate("At least one small alphabet.")}</li>
            <li>
              {translate("At least one digit and one special character.")}
            </li>
            <li>{translate("At least one special character.")}</li>
          </ul>
        ),
      password_confirmation: (value, values) =>
        value !== values?.password ? translate("Passwords did not match") : null,
    },
  });

  const handleReset = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/user/userPasswordReset"}`, values);
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          navigate(routeNames.general.login);
          showNotification({
            title: translate("Password Changed"),
            message: translate(response.data.message),
            color: "green.0",
          });
        } else {
          showNotification({
            title: translate("Error"),
            message: translate(response.data.message),
            color: "red.0",
          });
        }
      },
    }
  );
  if (!state?.otp) return <Loader />;

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
          {translate("Return To Login")}
        </Anchor>
      </Flex>
    </form>
  );
};
export default NewPassword;
