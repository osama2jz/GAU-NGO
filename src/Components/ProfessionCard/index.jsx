import { Avatar, Badge, Card, Grid, Stack, Text } from "@mantine/core";
import { CalendarEvent, Clock } from "tabler-icons-react";
import defaultLogo from "../../assets/teacher.png";
import Button from "../../Components/Button";
import Datepicker from "../../Components/Datepicker";
import Select from "../../Components/SelectMenu";
import Timepicker from "../../Components/Timepicker";
import { useStyles } from "./styles";

const Cards = ({ data }) => {
  const { classes } = useStyles();
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
          label="Schedule"
          primary={true}
          className={classes.button}
          styles={{ width: "100%" }}
        />
      </Card>
    </>
  );
};
export default Cards;
