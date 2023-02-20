import { Avatar, Badge, Card, Grid, Stack, Text } from "@mantine/core";
import moment from "moment";
import { useContext, useMemo, useState } from "react";
import { CalendarEvent, Clock } from "tabler-icons-react";
import defaultLogo from "../../assets/teacher.png";
import Button from "../../Components/Button";
import Datepicker from "../../Components/Datepicker";
import Select from "../../Components/SelectMenu";
import Timepicker from "../../Components/Timepicker";
import { UserContext } from "../../contexts/UserContext";
import ReferModal from "./ReferModal";
import ReferNewCaseModal from "./ReferNewCaseModal";
import { useStyles } from "./styles";

const Cards = ({ cardData, onRefer, onNew }) => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const [referModal, setReferModal] = useState(false);
  const [referNewModal, setReferNewModal] = useState(false);
  console.log("card", cardData);

  const dates=useMemo(()=>{
    return cardData?.schedule?.map((obj)=>moment(obj.dateStart).format("yyyy-MM-DD"))
  },[cardData])

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
          color={cardData?.schedule?.length > 0 ? "green" : "red"}
          radius="xl"
          className={classes.badge}
        >
          {cardData?.schedule?.length > 0 ? "Available" : "Not Available"}
        </Badge>
        <Avatar src={defaultLogo} size={90} />
        <Text size="lg" fw={680} mb={0} pb={0}>
          {cardData.name}
        </Text>
        <Text size="md" mt={0} fw={600} color="red">
          Lawyer
        </Text>
        <Stack spacing="xs" mb="xs">
          <Select
            placeholder="Branch"
            size="xs"
            data={cardData?.branches || []}
          />
          <Grid>
            <Grid.Col span={6}>
              <Datepicker
                size="xs"
                icon={<CalendarEvent size={16} />}
                labelFormat={"DD/MM/YY"}
                excludeDate={dates}
                dropdownType="modal"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Timepicker icon={<Clock size={16} />} />
            </Grid.Col>
          </Grid>
        </Stack>
        <Button
          label="Refer"
          primary={true}
          className={classes.button}
          onClick={() => setReferModal(true)}
          styles={{ width: "100%", marginBottom: "5px" }}
        />

          <Button
            label="Schedule New Case"
            primary={true}
            className={classes.button}
            onClick={() => setReferNewModal(true)}
            styles={{ width: "100%" }}
          />

      </Card>
      <ReferModal opened={referModal} setOpened={setReferModal} />
      <ReferNewCaseModal opened={referNewModal} setOpened={setReferNewModal} />
    </>
  );
};
export default Cards;
