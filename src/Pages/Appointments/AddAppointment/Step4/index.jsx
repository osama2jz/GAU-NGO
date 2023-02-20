import React, { useState } from "react";
import { Container, Text, Grid } from "@mantine/core";
import Cards from "../../../../Components/ProfessionCard";
import InputField from "../../../../Components/InputField";
import SelectMenu from "../../../../Components/SelectMenu";
import ReferModal from "../../../../Components/ProfessionCard/ReferModal";
const Step4 = () => {
  return (
    <>
      <Container size="lg">
        <Text fz={32} fw="bolder" align="center" mb={"md"}>
          Refer to Experts
        </Text>
        <Grid align={"center"} py="md">
          <Grid.Col md={6}>
            <InputField placeholder="Search" leftIcon="search" pb="0" />
          </Grid.Col>
          <Grid.Col md={6}>
            <SelectMenu
              placeholder="Select by Type"
              data={[
                { label: "Lawyer", value: "lawyer" },
                { label: "Psychologist", value: "psychologistng" },
                { label: "Social Worker", value: "socailworker" },
              ]}
            />
          </Grid.Col>
        </Grid>
        <Grid>
          {[1, 2, 3, 4].map((e,index) => (
            <Grid.Col md={6} lg={4} xl={3}>
              <Cards />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Step4;
