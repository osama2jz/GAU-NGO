import { Card, Flex, Image, Text } from "@mantine/core";
import clock from "../../assets/clock-solid.svg";
import meeting from "../../assets/handshake-solid.svg";
import user from "../../assets/users-solid.svg";
import { useStyles } from "./styles";
const Cards = ({ data ,setSlot}) => {
  const { classes } = useStyles();
  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      w={390}
      h={160}
      shadow="xl"
      onClick={()=>setSlot && setSlot(data?.scheduleId)}
    >
      {/* <Stack> */}
      <Text size={21} weight={700}>
        {data?.title}
      </Text>
      <Flex align="center" gap={6} mt="sm">
        <Image src={user} width={17} height={17} />
        <Text size="sm" color="dimmed" weight={500}>
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
