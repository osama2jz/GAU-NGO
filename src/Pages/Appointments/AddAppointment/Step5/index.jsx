import { Checkbox, Container, Flex, Text } from "@mantine/core";
import { useStyles } from "../styles";
import success from "../../../../assets/verified.svg";

const Step5 = () => {
 const { classes } = useStyles();
 return (
  <Container size="xl" p={"lg"} className={classes.verified}>
   <Flex align="center" gap={"md"} justify="center" m={"lg"}>
    <img src={success} width="80px" alt="verified" />
    <Flex direction={"column"}>
     <Text fw={"bold"}>Appointment Finished.</Text>
     <Text>Appointment Finished Successfully.</Text>
    </Flex>
   </Flex>
     <Text align="center">Do you want to refer this user for other appointments?.</Text>
  </Container>
 );
};
export default Step5;
