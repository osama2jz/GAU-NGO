import { Anchor, Container, Flex, Grid, Group, Text,Card} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import Button from "../../Components/Button";
import InputField from "../../Components/InputField";
import PassInput from "../../Components/PassInput";
import { useStyles } from "./styles";


export const Setting = () => {
  const { classes } = useStyles();
  const [showModal, setShowModal] = useState(false);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      firstName: (value) =>
        value.length < 1 ? "Please enter first name" : null,
      lastName: (value) =>
        value?.length < 1 ? "Please enter last name" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value?.length < 8 ? "Password must at least have 8 characters" : null,
      confirmPassword: (value, values) =>
        value !== values?.password ? "Passwords did not match" : null,
    },
  });
  return (
    <Container className={classes.main} size="lg">
        <Group >
        <Text fz={28} fw="bolder" mb="sm">
               Setting
            </Text>
            <Text fz={28} fw="bolder" mb="sm">
                Social Worker
            </Text>
        </Group>
        <Container 
        className={classes.container}
        p={30}
        shadow="sm">
        <Text fz={24} fw="bolder">
            Edit Profile
         </Text>
         <Text>
            Fill in the form below to update your profile
         </Text>
         <Card 
         mt="xl">
        <Grid>
      <Grid.Col span={4}>profile picture</Grid.Col>
      <Grid.Col span={8}>Data</Grid.Col>
      
    </Grid>

         </Card>
        </Container>


    
    </Container>
  );
};

export default Setting;
