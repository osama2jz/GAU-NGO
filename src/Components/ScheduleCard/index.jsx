import { Card, Flex, Image, Text } from "@mantine/core";
import clock from "../../assets/clock-solid.svg";
import meeting from "../../assets/handshake-solid.svg";
import user from "../../assets/users-solid.svg";
import { useStyles } from "./styles";
const Cards = ({ data ,setSlot,slot}) => {
  const { classes } = useStyles();
  console.log(data)
  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      w={370}
      h={160}
      shadow="xl"
      onClick={()=>setSlot && setSlot(data?.scheduleId)}
      // bg={slot === data?.scheduleId ? "grey" : "white"}
      style={{ cursor: "pointer"  ,
      border: slot === data?.scheduleId ? "3px solid green" : ""
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
    </Card>
  );
};
export default Cards;
