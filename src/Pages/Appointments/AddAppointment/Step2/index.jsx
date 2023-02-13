import React from "react";
import { SimpleGrid, Checkbox, Container, Flex, Grid, Text } from "@mantine/core";
import { useStyles } from "../styles";
import { texts } from "../userInformation";

const Step2 = () => {
 const { classes } = useStyles();
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
      alt="icon"
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
