import { Checkbox, Container, Flex, Text } from "@mantine/core";
import { useStyles } from "../styles";
import success from "../../../../assets/verified.svg";

export const Step5 = () => {
  const { classes } = useStyles();
  return (
    <Container size="xl" p={"lg"} className={classes.verified}>
      <Flex align="center" gap={"md"} justify="center" m={"lg"}>
        <img src={success} width="80px" alt="verified" />
        <Flex direction={"column"}>
          <Text fw={"bold"}>Verified Successfully.</Text>
          <Text>User has verified successfully.</Text>
        </Flex>
      </Flex>
    </Container>
  );
};
