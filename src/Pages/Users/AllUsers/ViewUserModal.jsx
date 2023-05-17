import {
  Grid,
  Avatar,
  SimpleGrid,
  Container,
  Text,
  Badge,
  Image,
  Flex,
} from "@mantine/core";
import { useStyles } from "./styles";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import userlogo from "../../../assets/teacher.png";
import { useMutation, useQuery } from "react-query";
import { useMediaQuery } from "@mantine/hooks";
import Button from "../../../Components/Button";
import DeleteModal from "../../../Components/DeleteModal";

function ViewUserModal({
  setOpenViewModal,
  id,
  reportData,
  cancelButton = false,
}) {
  // console.log(reportData)
  const { classes } = useStyles();
  const { user, translate } = useContext(UserContext);
  const [userdata, setUserData] = useState();
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const matches = useMediaQuery("(min-width: 640px)");
  const { data, status } = useQuery(
    "fetchUserbyId",
    () => {
      return axios.get(`${backendUrl + `/api/user/listSingleUser/${id}`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        setUserData(response.data.data);
      },
    }
  );

  //API call for Cancel Appointments
  const CancelAppointment = useMutation(
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
        setOpenViewModal(false);
        setOpenCancelModal(false);
      },
    }
  );
  return (
    <Flex align="center" direction="column">
      <Avatar
        radius="50%"
        size={150}
        src={reportData?.image}
        className={classes.avatar}
      />
      <Container w={!matches ? "100%" : "85%"} p={"0px"} mt="md">
        <SimpleGrid cols={2} spacing="xs" w={"100%"}>
          <Text className={classes.textheading}>{translate("Name")}</Text>
          <Text className={classes.textContent}>{reportData?.name}</Text>
          <Text className={classes.textheading}>{translate("Email")}</Text>
          <Text className={classes.textContent}>{reportData?.email}</Text>
          <Text className={classes.textheading}>
            {translate("Phone Number")}
          </Text>
          <Text className={classes.textContent}>{reportData?.phone}</Text>
          <Text className={classes.textheading}>{translate("Status")}</Text>
          <Badge
            variant="outline"
            color={reportData?.accStatus === "inactive" ? "red.0" : "green.0"}
            w={"150px"}
            ml="20px"
          >
            {translate(reportData?.accStatus)}
          </Badge>
          <Text className={classes.textheading}>
            {translate("User Status")}
          </Text>
          <Badge
            variant="outline"
            color={reportData?.status === "unverified" ? "red.0" : "green.0"}
            radius="md"
            ml="20px"
            w={"150px"}
          >
            {translate(reportData?.status)}
          </Badge>
        </SimpleGrid>
        {cancelButton && (
          <Button
            label={"Cancel Appointment"}
            styles={{ float: "right", marginTop: "10px" }}
            onClick={() => {
              setOpenCancelModal(true);
            }}
          />
        )}
      </Container>
      <DeleteModal
        opened={openCancelModal}
        setOpened={setOpenCancelModal}
        onCancel={() => setOpenCancelModal(false)}
        onDelete={() => {
          CancelAppointment.mutate(reportData.appointmentId);
        }}
        cancel={"No"}
        deletee={"Yes"}
        loading={CancelAppointment.isLoading}
        label="Are you Sure?"
        message="Do you really want to cancel this appointment?"
      />
    </Flex>
  );
}

export default ViewUserModal;
