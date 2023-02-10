import { Container, Flex, Grid, SimpleGrid, Text } from "@mantine/core";
import React, { useState } from "react";
import SelectMenu from "../../../../Components/SelectMenu";
import { useStyles } from "../styles";
import { texts } from "../userInformation";

const Step1 = () => {
  const { classes } = useStyles();
  const [user, setUser] = useState("");
  return (
    <Flex gap={"md"} direction="column" px={"md"}>
      <Text fz={20} fw="bolder" align="center">
        Select User
      </Text>
      <SelectMenu
        searchable={true}
        placeholder="Enter User name of Id"
        clearable={true}
        setData={setUser}
        label="Search User"
        data={[
          { label: "verified", value: "2352344" },
          { label: "Pending", value: "235254" },
          { label: "Pending", value: "235254" },
        ]}
      />
      <SelectMenu
        searchable={true}
        placeholder="Enter case name or id"
        label="Search User Case"
        creatable={true}
        data={[
          { label: "verified", value: "Personal" },
          { label: "Pending", value: "Wealth" },
          { label: "Pending", value: "Divorce" },
        ]}
      />
      {user && (
        <Grid mt={30}>
          <Grid.Col md={6}>
            <img
              className={classes.image}
              src="https://visualpharm.com/assets/387/Person-595b40b75ba036ed117da139.svg"
              alt="img"
            />
          </Grid.Col>
          <Grid.Col md={4} xs={5}>
            <SimpleGrid cols={2}>{texts}</SimpleGrid>
          </Grid.Col>
        </Grid>
      )}
    </Flex>
  );
};

export default Step1;
