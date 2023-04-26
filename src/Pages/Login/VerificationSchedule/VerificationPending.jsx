import { Flex, Text } from "@mantine/core";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "../../../Components/Button";
import routeNames from "../../../Routes/routeNames";
import pending from "../../../assets/pending.gif";
import { UserContext } from "../../../contexts/UserContext";

const VerificationPending = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setUser, translate } = useContext(UserContext);
  return (
    <Flex direction={"column"} align="center" w={"70%"} m="auto" gap={"md"}>
      <img src={pending} width="70%" />
      <Text align="center">
        {translate("Your appointment for account verification has been scheduled. Please visit on site to verify your account")}.
      </Text>
      <Text>
        <b>{translate("Appointment Date")}:</b> {state?.data.appointmentDate}
        <br />
        <b>{translate("Appointment Time")}:</b> {state?.data.appointmentTime}
      </Text>
      <Button
        label={"Log Out"}
        onClick={() => {
          localStorage.clear();
          navigate(routeNames.general.login);
          setUser();
        }}
      />
    </Flex>
  );
};
export default VerificationPending;
