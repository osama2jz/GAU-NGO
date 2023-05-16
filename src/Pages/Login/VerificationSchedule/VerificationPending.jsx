import { Flex, Group, Text } from "@mantine/core";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "../../../Components/Button";
import routeNames from "../../../Routes/routeNames";
import pending from "../../../assets/pending.gif";
import { UserContext } from "../../../contexts/UserContext";
import DeleteModal from "../../../Components/DeleteModal";
import { useMutation } from "react-query";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { showNotification } from "@mantine/notifications";

const VerificationPending = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(state);
  const { setUser, translate,user } = useContext(UserContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  //API call for Cancel Appointments
  const CancelAppointments = useMutation(
    (id) => {
      return axios.get(
        `${backendUrl + `/api/appointment/cancelAppointment/${id}`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: translate("Appointment Cancelled"),
          message: translate("Appointment Cancelled Successfully"),
          color: "green.0",
        });
        // navigate(routeNames.socialWorker.allAppointments);
        navigate(routeNames.general.verificationSchedule)
        setOpenDeleteModal(false);
      },
    }
  );
  return (
    <Flex direction={"column"} align="center" w={"70%"} m="auto" gap={"md"}>
      <img src={pending} width="60%" />
      <Text align="center">
        {translate("Your appointment for account verification has been scheduled. Please visit on site to verify your account")}.
      </Text>
      <Text>
        <b>{translate("NGO")}:</b> {state?.data?.otherInfo?.ngoName}
        <br />
        <b>{translate("Branch")}:</b> {state?.data?.otherInfo?.branchName}
        <br />
        <b>{translate("Appointment With")}:</b> {state?.data?.otherInfo?.professionalName}
        <br />
        <b>{translate("Appointment Date")}:</b> {state?.data.appointmentDate}
        <br />
        <b>{translate("Appointment Time")}:</b> {state?.data.appointmentTime}
      </Text>
      <Group>
      <Button
        label={"Log Out"}
        onClick={() => {
          localStorage.clear();
          navigate(routeNames.general.login);
          setUser();
        }}
      />
       <Button
        label={"Cancel"}
        onClick={() => {
          setOpenDeleteModal(true);
        }}
      />
      </Group>
     
       {/* <Button
        label={"Reschedule"}
        onClick={() => {
          localStorage.clear();
          navigate(routeNames.general.login);
          setUser();
        }}
      /> */}
      <DeleteModal
        opened={openDeleteModal}
        setOpened={setOpenDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={() => {
          CancelAppointments.mutate(state?.data?.otherInfo?.appointmentId);
          
        }}
        cancel={"No"}
        deletee={"Yes"}
        loading={CancelAppointments.isLoading}
        label="Are you Sure?"
        message="Do you really want to cancel this appointment?"
      />
    </Flex>
    
  );
};
export default VerificationPending;
