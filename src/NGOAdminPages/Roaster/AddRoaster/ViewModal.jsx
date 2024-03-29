import {
  Avatar,
  Container,
  createStyles,
  Flex,
  Group,
  Modal,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { Tex } from "tabler-icons-react";
import Button from "../../../Components/Button";
import CalendarDate from "../../../Components/Calendar";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { CalendarEvent } from "tabler-icons-react";

const LeaveModal = ({
  opened,
  setOpened,
  onSubmit,
  startDate,
  selectedProfessional,
  endDate,
  selectedBranch,
  loading,
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
  const { translate } = useContext(UserContext);

  return (
    <Modal
      title={translate("Add Roaster")}
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      radius="lg"
      classNames={{ title: classes.title, body: classes.root }}
      size={"700px"}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Container>
        {/* <Text>Are you sure you want to add this Roaster?</Text> */}
        <Container className={classes.cal} mb="lg" mt="md">
          {/* <CalendarDate
          // setDate={setDate}
          // getSchedule={getSchedule}
          // scheduleDates={scheduleDates}
          /> */}
          {selectedBranch && (
            <Text fz={"23px"} align="center" fw={"bold"}>
              {selectedBranch[0]?.label}
            </Text>
          )}
          <SimpleGrid cols={4} mt={"md"} bg={"#E9ECEF"} p={"xs"}>
            <Flex>
              {<CalendarEvent />}
              <Text fz={"md"} fw={"bold"}>
                {translate("Start Date")}
              </Text>
            </Flex>

            <Text fz={"md"}>
              {translate(moment(startDate).format("MMMM"))}{" "}
              {moment(startDate).format("D")}
              {", "}
              {moment(startDate).format("YYYY")}
            </Text>

            <Flex>
              {<CalendarEvent />}
              <Text fz={"md"} fw={"bold"}>
                {translate("End Date")}
              </Text>
            </Flex>

            <Text fz={"md"}>
              {translate(moment(endDate).format("MMMM"))}{" "}
              {moment(endDate).format("D")}
              {", "}
              {moment(endDate).format("YYYY")}
            </Text>
          </SimpleGrid>
        </Container>
        <Container>
          <Text align="center" fz={"xl"} fw={"bold"}>
            {translate("Selected Professionals")}
          </Text>

          {selectedProfessional.filter((item) => item.role === "Social Worker")
            .length > 0 && (
            <Text fw={"bold"} fz={"md"} mb={"md"} mt={"sm"}>
              {translate("Social Worker")}
            </Text>
          )}
          <SimpleGrid cols={2} mt={"md"}>
            {selectedProfessional &&
              selectedProfessional
                .filter((item) => item.role === "Social Worker")
                .map((item) => (
                  <Paper shadow="md" radius="md" p="xs" withBorder>
                    <Group>
                      <Avatar src={item?.image} />
                      <Stack spacing="1">
                        <Text fz={"md"} fw={"bold"}>
                          {item?.label}
                        </Text>
                        <Text fz={"sm"}>{translate(item?.role)}</Text>
                      </Stack>
                    </Group>
                  </Paper>
                ))}
          </SimpleGrid>
          {selectedProfessional &&
            selectedProfessional?.filter((item) => item.role === "Psychologist")
              .length > 0 && (
              <Text fw={"bold"} fz={"md"} mt={"md"}>
                {translate("Psychologist")}
              </Text>
            )}
          <SimpleGrid cols={2} mt={"md"}>
            {selectedProfessional &&
              selectedProfessional
                ?.filter((item) => item.role === "Psychologist")
                .map((item) => (
                  <Paper shadow="md" radius="md" p="xs" withBorder>
                    <Group>
                      <Avatar src={item?.image} />
                      <Stack spacing="1">
                        <Text fz={"md"} fw={"bold"}>
                          {item?.label}
                        </Text>
                        <Text fz={"sm"}>{translate(item?.role)}</Text>
                      </Stack>
                    </Group>
                  </Paper>
                ))}
          </SimpleGrid>
          {selectedProfessional &&
            selectedProfessional.filter((item) => item.role === "Lawyer")
              .length > 0 && (
              <Text fw={"bold"} fz={"md"} mt={"md"}>
                {translate("Lawyer")}
              </Text>
            )}
          <SimpleGrid cols={2} mt={"md"}>
            {selectedProfessional &&
              selectedProfessional
                .filter((item) => item.role === "Lawyer")
                .map((item) => (
                  <Paper shadow="md" radius="md" p="xs" withBorder>
                    <Group>
                      <Avatar src={item?.image} />
                      <Stack spacing="1">
                        <Text fz={"md"} fw={"bold"}>
                          {item?.label}
                        </Text>
                        <Text fz={"sm"}>{translate(item?.role)}</Text>
                      </Stack>
                    </Group>
                  </Paper>
                ))}
          </SimpleGrid>

          {/* <SimpleGrid cols={2} mt={"md"}>
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
          </SimpleGrid> */}
        </Container>
        <Group position="right" mt={"xl"}>
          <Button
            label={translate("Review")}
            w="100px"
            onClick={() => setOpened(false)}
          />
          <Button
            label={translate("Finish")}
            primary={true}
            w="100px"
            onClick={() => onSubmit()}
            loading={loading}
          />
        </Group>
      </Container>
    </Modal>
  );
};

export default LeaveModal;
