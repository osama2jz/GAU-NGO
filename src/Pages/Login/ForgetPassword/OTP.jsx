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
import Loader from "../../../Components/Loader";
import { backendUrl } from "../../../constants/constants";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "../styles";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const OTP = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const {translate } = useContext(UserContext);

  const { state } = useLocation();

  useEffect(() => {
    if (state && state.allowed) {
    } else {
      navigate(-1);
    }
  }, [state]);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      OTP: "",
      type: "password",
    },

    validate: {
      OTP: (value) => (value.length > 0 ? null : translate("Enter a valid OTP")),
    },
  });

  const handleOTP = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/user/verifyOTP"}`, values);
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          navigate(routeNames.general.resetPassword, {
            state: { otp: values.OTP },
          });
          showNotification({
            title: "OTP Verified",
            message: response.data.message,
            color: "green.0",
          });
        } else {
          showNotification({
            title: "Invalid OTP",
            message: response.data.message,
            color: "red.0",
          });
        }
      },
    }
  );
  if (!state?.allowed) return <Loader />;
  return (
    <form
      className={classes.form}
      onSubmit={form.onSubmit((values) => handleOTP.mutate(values))}
    >
      <ContainerHeader label={"Verify OTP"} />
      <InputField placeholder={"Enter OTP"} form={form} validateName="OTP" />
      <Button
        label={"Continue"}
        bg={true}
        type="submit"
        w={"100%"}
        size="lg"
        loading={handleOTP.isLoading}
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
