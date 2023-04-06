import { Container, Flex, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router";
import Button from "../../../Components/Button";
import pending from "../../../assets/pending.gif";
import routeNames from "../../../Routes/routeNames";
import moment from "moment";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const VerificationPending = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setUser } = useContext(UserContext);
  return (
    <Flex direction={"column"} align="center" w={"70%"} m="auto" gap={"md"}>
      <img src={pending} width="70%" />
      <Text align="center">
        Your appointment for account verification has been scheduled. Please
        visit on site to verify your account.
      </Text>
      <Text>
        <b>Appointment Date:</b> {state?.data.appointmentDate}
        <br />
        <b>Appointment Time:</b> {state?.data.appointmentTime}
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
