import { Checkbox, Container, Flex, Text } from "@mantine/core";
import { useStyles } from "../styles";
import success from "../../../../assets/verified.svg";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";

const Step5 = () => {
 const { classes } = useStyles();
 const {translate}=useContext(UserContext)
 return (
  <Container size="xl" p={"lg"} className={classes.verified}>
   <Flex align="center" gap={"md"} justify="center" m={"lg"}>
    <img src={success} width="80px" alt="verified" />
    <Flex direction={"column"}>
     <Text fw={"bold"}>{translate("Appointment Finished")}.</Text>
     <Text>{translate("Appointment Finished Successfully")}.</Text>
    </Flex>
   </Flex>
     <Text align="center">{translate("Do you want to refer this user for other appointments")}?</Text>
  </Container>
 );
};
export default Step5;
