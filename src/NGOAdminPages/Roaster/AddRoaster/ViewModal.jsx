import {
  Avatar,
  Container,
  createStyles,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { useMutation } from "react-query";
import { Tex } from "tabler-icons-react";
import Button from "../../../Components/Button";
import CalendarDate from "../../../Components/Calendar";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";

const LeaveModal = ({
  opened,
  setOpened,
  onSubmit,
  startDate,
  selectedProfessional,
  endDate,
}) => {
  const useStyles = createStyles((theme) => ({
    title: {
      margin: "auto",
      fontSize: "25px",
      fontWeight: "bold",
      color: "#5C5F66",
      // marginLeft:"150px"
    },
    root: {},
  }));
  const { classes } = useStyles();
  const { user } = useContext(UserContext);

  console.log("startDate", moment(startDate).format("MMMM D, YYYY"));

  return (
    <Modal
      title={"Add Roaster"}
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      radius="lg"
      classNames={{ title: classes.title, body: classes.root }}
      size={"600px"}
    >
      <Container>
        {/* <Text>Are you sure you want to add this Roaster?</Text> */}
        <Container className={classes.cal} mb="lg" mt="md">
          {/* <CalendarDate
          // setDate={setDate}
          // getSchedule={getSchedule}
          // scheduleDates={scheduleDates}
          /> */}
          <SimpleGrid cols={4}>
          <Text fz={"lg"} >Start Date</Text>
          <Text fw={"bold"} fz={"md"}>{moment(startDate).format("MMMM D, YYYY")}</Text>
          <Text fz={"lg"}>End Date</Text>
          <Text fz={"md"} fw={"bold"}>{moment(endDate).format("MMMM D, YYYY")}</Text>

          </SimpleGrid>
          
        </Container>
        <Container>
          <Text align="center" fz={"lg"} fw={"bold"}>
            Selected Professionals
          </Text>

          <SimpleGrid cols={2} mt={"md"}>
            {selectedProfessional &&
              selectedProfessional.map((item) => (
                <Paper shadow="md" radius="md" p="xs" withBorder>
                  <Group>
                    <Avatar src={item?.image} />
                    <Stack spacing="1">
                      <Text fz={"md"} fw={"bold"}>
                       {item?.label}
                      </Text>
                      <Text fz={"sm"}>{item?.role}</Text>
                    </Stack>
                  </Group>
                </Paper>
              ))}
          </SimpleGrid>
        </Container>
        <Group position="right" mt={"xl"}>
          <Button label={"Review"} w="100px" onClick={() => setOpened(false)} />
          <Button label={"Finish"} primary={true} w="100px" />
        </Group>
      </Container>
    </Modal>
  );
};

export default LeaveModal;
