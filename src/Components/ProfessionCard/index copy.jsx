import { Avatar, Badge, Card, Grid, Stack, Text } from "@mantine/core";
import { useContext, useState } from "react";
import { CalendarEvent, Clock } from "tabler-icons-react";
import defaultLogo from "../../assets/teacher.png";
import Button from "../../Components/Button";
import Datepicker from "../../Components/Datepicker";
import Select from "../../Components/SelectMenu";
import Timepicker from "../../Components/Timepicker";
import { UserContext } from "../../contexts/UserContext";
import ReferModal from "./ReferModal";
import { useStyles } from "./styles";

const Cards = ({ data, onRefer, onNew }) => {
  const { classes } = useStyles();
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
        <Badge color="green" radius="xl" className={classes.badge}>
          Available
        </Badge>
        <Avatar src={defaultLogo} size={90} />
        <Text size="lg" fw={680} mb={0} pb={0}>
          Saliha Arif
        </Text>
        <Text size="md" mt={0} fw={600} color="red">
          Lawyer
        </Text>
        <Stack spacing="xs" mb="xs">
          <Select
            placeholder="Branch"
            size="xs"
            data={[
              { label: "verified", value: "verified" },
              { label: "Pending", value: "pending" },
            ]}
          />
          <Grid>
            <Grid.Col span={6}>
              <Datepicker
                size="xs"
                icon={<CalendarEvent size={16} />}
                labelFormat={"DD/MM/YY"}
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
        {user.role !== "Social Worker" && (
          <Button
            label="Schedule New Case"
            primary={true}
            className={classes.button}
            onClick={onNew}
            styles={{ width: "100%" }}
          />
        )}
      </Card>
      <ReferModal opened={referModal} setOpened={setReferModal} />
    </>
  );
};
export default Cards;
