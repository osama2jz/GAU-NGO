import { Avatar, Badge, Card, Flex, Grid, Stack, Text } from "@mantine/core";
import moment from "moment";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { CalendarEvent, Clock, Clock2 } from "tabler-icons-react";
import defaultLogo from "../../assets/teacher.png";
import Button from "../../Components/Button";
import Datepicker from "../../Components/Datepicker";
import Select from "../../Components/SelectMenu";
import Timepicker from "../../Components/Timepicker";
import { UserContext } from "../../contexts/UserContext";
import routeNames from "../../Routes/routeNames";
import ReferModal from "./ReferModal";
import ReferNewCaseModal from "./ReferNewCaseModal";
import { useStyles } from "./styles";

const Cards = ({
  cardData,
  slot,
  buttonChange = false,
  setReferedTo,
  referedTo,
  setSlot,
  onSubmit,
  caseId,
}) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [referModal, setReferModal] = useState(false);

  return (
    <>
      <Card
        className={classes.card}
        shadow="lg"
        w={235}
        component="a"
        radius={26}
        withBorder
      >
        <Badge
          color={cardData?.scheduleStatus ? "green.0" : "red.0"}
          radius="xl"
          variant="outline"
          className={classes.badge}
        >
          {cardData?.scheduleStatus ? "Available" : "Not Available"}
        </Badge>
        <Avatar src={defaultLogo} size={90} />
        <Text size="lg" fw={680} mb={0} pb={0}>
          {cardData.name}
        </Text>
        <Text size="md" mt={0} fw={600} color="red.0">
          {cardData.role === "socialWorker"
            ? "Social Worker"
            : cardData.role === "lawyer"
            ? "Lawyer"
            : "Psychologist"}
        </Text>
        <Flex align={"center"} gap={6} mt="xs" mb={"md"}>
          <CalendarEvent size={"20px"} />
          <Text size="md" fw={500}>
            {cardData?.timeStartSlot}-{cardData?.timeEndSlot}
          </Text>
        </Flex>

        <Button
          label={buttonChange ? "Schedule" : "Refer"}
          bg={true}
          className={classes.button}
          // onClick={() => {
          //   setReferModal(true);
          //   setReferedTo(cardData?.userId);
          // }}
          loading={onSubmit?.isLoading}
          onClick={() => {
            onSubmit.mutate({
              slotid: cardData?.schedule,
              referedToId: cardData?.userId,
            });
            console.log("DATA PASSED", {
              slotid: cardData?.schedule,
              referedToId: cardData?.userId,
            });
            // alert(cardData?.timeStartSlot)
          }}
          styles={{ width: "100%", marginBottom: "5px", marginTop: "0px" }}
          compact={true}
        />

        {!buttonChange && (
          <Button
            label="Schedule New Case"
            primary={true}
            className={classes.button}
            onClick={() => navigate(routeNames.socialWorker.addAppoinment)}
            styles={{ width: "100%" }}
            compact={true}
          />
        )}
      </Card>
      <ReferModal
        opened={referModal}
        setOpened={setReferModal}
        setSlot={setSlot}
        id={referedTo}
        onSubmit={onSubmit}
        buttonChange={buttonChange}
        slot={slot}
        caseId={caseId}
      />
      {/* <ReferNewCaseModal opened={referNewModal} setOpened={setReferNewModal} /> */}
    </>
  );
};
export default Cards;
