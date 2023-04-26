import { Badge, Card, Flex, Image, Text } from "@mantine/core";
import clock from "../../assets/clock-solid.svg";
import meeting from "../../assets/handshake-solid.svg";
import user from "../../assets/users-solid.svg";
import { useStyles } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
const Cards = ({ data ,setSlot,slot}) => {
  const { classes } = useStyles();
  const {translate}=useContext(UserContext)
  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      w={370}
      // h={160}
      shadow="xl"
      onClick={()=>setSlot && setSlot(data?.scheduleId)}
      style={{ cursor: "pointer"  ,
      // border: slot === data?.scheduleId ? "3px solid green" : ""
      }}
    >
      {/* <Stack> */}
      <Text size={22} weight={700}>
        {data?.title}
      </Text>
      <Flex align="center" justify={"flex-start"} gap={6} mt="sm">
        <Image src={user} width={17} height={17} />
        <Text size="md" color="dimmed" weight={500}>
          {data?.branch}
        </Text>
      </Flex>
      <Flex align="center" gap={6} mt="sm">
        <Image src={clock} width={17} height={17} />
        <Text size="md" weight={500} color="dimmed">
          {data?.startTime} {"-"} {data?.endTime}
        </Text>
      </Flex>
        <Badge variant="filled" color={data?.booked ? "red.0" : 'green.0'}>{data?.booked ? translate("Booked") : translate("Not Booked")}</Badge>
    </Card>
  );
};
export default Cards;
