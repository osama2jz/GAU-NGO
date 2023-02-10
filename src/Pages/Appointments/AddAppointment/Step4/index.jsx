import React from "react";
import { Container, Text, Grid } from "@mantine/core";
import Cards from "../../../../Components/ProfessionCard";
const Step4 = () => {
 return (
  <>
   <Container size="lg">
    <Text fz={32} fw="bolder" align="center" mb={"md"}>
     Refer to Experts
    </Text>
    <Grid>
     {[1, 2, 3, 4].map((e) => (
      <Grid.Col md={3}>
       <Cards />
      </Grid.Col>
     ))}
    </Grid>
   </Container>
  </>
 );
};

export default Step4;
