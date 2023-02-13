import {
  Avatar,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import InputField from "../../../../Components/InputField";
import SelectMenu from "../../../../Components/SelectMenu";
import { useStyles } from "../styles";
import { texts } from "../userInformation";

const Step1 = () => {
  const { classes } = useStyles();
  const [user, setUser] = useState("");
  const data = [
    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
      label: "Bender Bending Rodríguez",
      value: "Bender Bending Rodríguez",
      description: "FN12442455",
    },

    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
      label: "Carol Miller",
      value: "Carol Miller",
      description: "FN12442455",
    },
    {
      image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
      label: "Homer Simpson",
      value: "Homer Simpson",
      description: "FN12442455",
    },
    {
      image:
        "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
      label: "Spongebob Squarepants",
      value: "Spongebob Squarepants",
      description: "FN12442455",
    },
  ];
  const customUserItem = ({ image, label, description, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  );

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
        itemComponent={customUserItem}
        data={data}
      />
      <Grid align={"center"}>
        <Grid.Col md={"5"}>
          <SelectMenu
            searchable={true}
            placeholder="Enter case name or id"
            label="Search User Case"
            data={[
              { label: "verified", value: "Personal" },
              { label: "Pending", value: "Wealth" },
              { label: "Pending", value: "Divorce" },
            ]}
          />
        </Grid.Col>
        <Grid.Col md="2">
          <Divider label="OR" color={"black"} labelPosition="center" mt="lg" />
        </Grid.Col>
        <Grid.Col md={"5"}>
          <InputField
            label={"Add New Case"}
            placeholder="Enter Case Name"
            pb="0px"
          />
        </Grid.Col>
      </Grid>

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
