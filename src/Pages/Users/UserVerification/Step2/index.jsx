import {
  Container,
  Divider,
  Grid,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Edit, Trash } from "tabler-icons-react";
import InputField from "../../../../Components/InputField";
import Table from "../../../../Components/Table";
import TextArea from "../../../../Components/TextArea";
import { useStyles } from "../styles";

export const Step2 = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  let headerData = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "Sr No.",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    {
      id: "phone",
      numeric: false,
      disablePadding: true,
      label: "Phone",
    },
    {
      id: "center",
      numeric: false,
      disablePadding: true,
      label: "Center",
    },
    {
      id: "actions",
      edit: <Edit color="#4069bf" />,
      delete: <Trash color="red" />,
      numeric: false,
      label: "Actions",
    },
  ];

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
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
      phone: (value) =>
        value?.length < 8 ? "Please enter phone number" : null,
      confirmPassword: (value, values) =>
        value !== values?.password ? "Passwords did not match" : null,
    },
  });
  return (
    <Container className={classes.addUser} size="lg">
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => console.log("value", values))}
      >
        <Text className={classes.subHeading}>Personal Information</Text>
        <SimpleGrid cols={3}>
          <InputField
            label="First Name"
            required={true}
            placeholder="First Name"
            form={form}
            validateName="firstName"
          />
          <InputField
            label="Last Name"
            required={true}
            placeholder="Last Name"
            form={form}
            validateName="lastName"
          />
          <InputField
            label="Date of Birth"
            required={true}
            placeholder="dob"
            form={form}
            validateName="dob"
          />
          <InputField
            label="Passport"
            required={true}
            placeholder="FN2342444"
            form={form}
            validateName="passport"
          />
          <InputField
            label="Nationality"
            required={true}
            placeholder="Pakistani"
            form={form}
            validateName="nationality"
          />
          <InputField
            label="Origin"
            required={true}
            placeholder="origin"
            form={form}
            validateName="origin"
          />
          <InputField
            label="Age"
            required={true}
            type="number"
            placeholder="age"
            form={form}
            validateName="age"
          />
          <InputField
            label="Domicile"
            required={true}
            placeholder="domicile"
            form={form}
            validateName="domicile"
          />
          <InputField
            label="Muncipality"
            required={true}
            placeholder="mucipality"
            form={form}
            validateName="muncipality"
          />
        </SimpleGrid>
        {/* <Divider color={theme.colors.grayDark} /> */}
        <Text className={classes.subHeading}>Professional References</Text>
        <Table headCells={headerData} rowData={[]} />
        {/* <Divider color={theme.colors.grayDark} /> */}
        <Text className={classes.subHeading}>Socio-Family Situation</Text>
        <TextArea label="Marital Status - Family Composition - Social Network" />
        {/* <Divider color={theme.colors.grayDark} /> */}
        <Text className={classes.subHeading}>Economic Situation</Text>
        <SimpleGrid cols={3}>
          <InputField
            label="Revenue"
            required={true}
            placeholder="revenue"
            form={form}
            validateName="revenue"
          />
          <InputField
            label="Expenses"
            required={true}
            placeholder="expenses"
            form={form}
            validateName="expenses"
          />
          <InputField
            label="Aids or Bonuses"
            required={true}
            placeholder="aid or bonuses"
            form={form}
            validateName="aob"
          />
          <InputField
            label="Debt"
            required={true}
            placeholder="debt"
            form={form}
            validateName="debt"
          />
          <InputField
            label="Housing"
            required={true}
            placeholder="housing"
            form={form}
            validateName="housing"
          />
        </SimpleGrid>
        {/* <Divider color={theme.colors.grayDark} /> */}
        <Text className={classes.subHeading}>Health Aspects</Text>
        <TextArea label="Disability - Dependencies - Mental Health" />
        {/* <Divider color={theme.colors.grayDark} /> */}
        <Text className={classes.subHeading}>Studies and Training</Text>
        <SimpleGrid cols={2}>
          <InputField
            label="Education Level"
            required={true}
            placeholder="Education Level "
            form={form}
            validateName="education"
          />
          <InputField
            label="Characteristics"
            required={true}
            placeholder="characteristics"
            form={form}
            validateName="char"
          />
          <InputField
            label="Complementary Trainging"
            required={true}
            placeholder="training"
            form={form}
            validateName="training"
          />
          <InputField
            label="Realization Year"
            required={true}
            placeholder="Realization Year"
            form={form}
            validateName="realization"
          />
        </SimpleGrid>
      </form>
    </Container>
  );
};
