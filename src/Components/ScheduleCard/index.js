import {
    Card,
    Flex, Image, Text
} from "@mantine/core";
import clock from "../../assets/clock-solid.svg";
import meeting from "../../assets/handshake-solid.svg";
import user from "../../assets/users-solid.svg";
import { useStyles } from "./styles";
const Cards = ({ data }) => {
    const { classes } = useStyles();
    return (
        <Card
            withBorder
            radius="md"
            className={classes.card}
            w={240}
            h={160}
            shadow="xl"
        >
            {/* <Stack> */}
            <Text size={21} weight={700}>
                Branch 1
            </Text>
            <Flex align="center" gap={6} mt="sm">
                <Image src={clock} width={17} height={17} />
                <Text size="sm" weight={500} color="dimmed">
                    9:00 AM - 10:00 AM
                </Text>
            </Flex>
            <Flex align="center" gap={6} mt="sm">
                <Image src={user} width={17} height={17} />
                <Text size="sm" color="dimmed" weight={500}>
                    2 Users Scheduled
                </Text>
            </Flex>
            <Flex align="center" gap={6} mt="sm">
                <Image src={meeting} width={17} height={17} />
                <Text size="sm" color="dimmed" weight={500}>
                    5 Meetings Scheduled
                </Text>
            </Flex>
        </Card>
    );
};
export default Cards;
