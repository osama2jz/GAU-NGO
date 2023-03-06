import { Avatar, Badge, Card, Grid, Stack, Text } from "@mantine/core";
import moment from "moment";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { CalendarEvent, Clock } from "tabler-icons-react";
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

  // const dates = useMemo(() => {
  //   return cardData?.schedule?.map((obj) =>
  //     moment(obj.dateStart).format("yyyy-MM-DD")
  //   );
  // }, [cardData]);

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
          color={cardData?.schedule ? "green.0" : "red.0"}
          radius="xl"
          variant="outline"
          className={classes.badge}
        >
          {cardData?.schedule ? "Available" : "Not Available"}
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
        <Stack spacing="xs" mb="xs">
          {/* <Select
            placeholder="Branch"
            size="xs"
            
            onChange={(e) => {
              setNewReferCase({...referCase,branchId:e})
            }}
            
            data={cardData?.branches || []}
            // setData={setSelectedData}
          /> */}
          {/* <Grid>
            <Grid.Col span={6}>
              <Datepicker
                size="xs"
                icon={<CalendarEvent size={16} />}
                labelFormat={"DD/MM/YY"}
                excludeDate={dates}
                dropdownType="modal"
                onChange={(e) =>
                  setNewReferCase({
                    ...referCase,
                    referedCaseAppointmentDate: moment(e).format("yyyy-MM-DD"),
                  })
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Timepicker
                icon={<Clock size={16} />}
                onChange={(e) =>
                  setNewReferCase({
                    ...referCase,
                    referedCaseAppointmentTime: moment(e).format("hh:mm"),
                  })
                }
              />
            </Grid.Col>
          </Grid> */}
        </Stack>
        <Button
          label={buttonChange ? "Schedule" : "Refer"}
          bg={true}
          className={classes.button}
          onClick={() => {
            setReferModal(true);
            setReferedTo(cardData?.userId);
          }}
          styles={{ width: "100%", marginBottom: "5px" }}
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
