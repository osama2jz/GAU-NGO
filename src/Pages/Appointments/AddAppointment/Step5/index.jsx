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
     <Text fw={"bold"}>Submitted Successfully.</Text>
     <Text>Report Submitted Successfully.</Text>
    </Flex>
   </Flex>
  </Container>
 );
};
export default Step5;
