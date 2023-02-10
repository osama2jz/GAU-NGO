import React from "react";
import { SimpleGrid, Checkbox, Container, Flex, Grid, Text } from "@mantine/core";
import { useStyles } from "../styles";

const Step2 = () => {
 const { classes } = useStyles();
 const texts = [
  "Full Name",
  "Passport",
  "Date of Birth",
  "Nationality",
  "Origin",
  "Age",
  "Domicile",
  "Municipality",
 ].map((e, i) => {
  return (
   <>
    <Text fz={16} fw={"bold"}>
     {e}
    </Text>
    <Text opacity={"40%"} fz={16} fw={"bold"}>
     {e}
    </Text>
   </>
  );
 });

 return (
  <Container size="lg">
   <Text fz={20} fw="bolder" align="center" mb={"md"}>
    Meeting In Progress
   </Text>
   <Flex justify={"space-between"}>
    <Flex align={"center"}>
     <Text fz={18} fw={"bold"}>
      Case#
     </Text>
     <Text ml={10}>XXXX</Text>
    </Flex>
    <Flex align={"center"}>
     <Text fz={18} fw={"bold"}>
      Date:
     </Text>
     <Text ml={10}>XXXX</Text>
    </Flex>
   </Flex>
   <Grid mt={30}>
    <Grid.Col md={6}>
     <img
      className={classes.image}
      src="https://visualpharm.com/assets/387/Person-595b40b75ba036ed117da139.svg"
     />
    </Grid.Col>
    <Grid.Col md={4} xs={5}>
     <SimpleGrid cols={2}>{texts}</SimpleGrid>
    </Grid.Col>
   </Grid>
  </Container>
 );
};

export default Step2;
