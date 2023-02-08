import { Text, Card, Flex } from "@mantine/core";
import { useStyles } from "./styles";
import { Users } from "tabler-icons-react";
import { Progress } from "@mantine/core";

const Cards = ({ data }) => {
  const { classes } = useStyles();
  return (
    <>
      <Card
        className={classes.card}
        shadow="md"
        h={140}
        w={200}
        component="a"
        radius={26}
        withBorder
      >
        <Flex align={"baseline"} justify="space-between" mt="none">
          <Text weight={500} size="sm" mt="none" color="dimmed">
            {data.title}
          </Text>
          <Users size={16} strokeWidth={3} color={"black"} />
        </Flex>

        <Text mt="0px" fw="bolder" size={30}>
          100
        </Text>
        {/* <Text size="xs" m="none">50%</Text> */}
        <Progress mt="md" value={78} color={data.color} size={"sm"} />
        <Text fw="bolder" size={9}>
          Response Rate 50%
        </Text>
      </Card>
    </>
  );
};
export default Cards;
