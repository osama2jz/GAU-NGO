import { useState } from "react";
import {
  Card,
  Container,
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Edit, Trash } from "tabler-icons-react";
import InputField from "../../../../Components/InputField";
import Table from "../../../../Components/Table";
import TextArea from "../../../../Components/TextArea";
import Button from "../../../../Components/Button";
import { useStyles } from "../styles";
import ViewModal from "../../../../Components/ViewModal/viewUser";
import NewProfessionalModal from "./NewProfessional";
import NewWorkModal from "./NewWorkExperience";
export const Step2 = ({
  setActive,
  active,
  setAlldata,
  workExperience,
  setWorkExperience,
  refrences,
  setRefrences,
}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
      edit: <Edit color="#4069BF" />,
      delete: <Trash color="red" />,
      numeric: false,
      label: "Actions",
    },
  ];
  let headerData2 = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "Sr No.",
    },
    {
      id: "stand",
      numeric: false,
      disablePadding: true,
      label: "Stand",
    },
    {
      id: "contract",
      numeric: false,
      disablePadding: true,
      label: "Contract",
    },
    {
      id: "enterprise",
      numeric: false,
      disablePadding: true,
      label: "Enterprise",
    },
    {
      id: "duration",
      numeric: false,
      disablePadding: true,
      label: "Duration",
    },
    {
      id: "startDate",
      numeric: false,
      disablePadding: true,
      label: "Start Date",
    },
    {
      id: "endDate",
      numeric: false,
      disablePadding: true,
      label: "End Date",
    },
    {
      id: "actions",
      edit: <Edit color="#4069BF" />,
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
      age: "",
      dateOfBirth: "",
      passport: "",
      nationality: "",
      origin: "",
      domicile: "",
      muncipality: "",
      revenue: "",
      expenses: "",
      aidsBonuses: "",
      debt: "",
      housing: "",
      education: "",
      char: "",
      training: "",
      realization: "",
      healthAspects: "",
      socioFamily: "",
      tracking: "",
      demand: "",
      social: "",
      labour: "",
      educational: "",
      institutional: "",
      familiar: "",
    },
    validate: {
      dateOfBirth: (value) =>
        value.length < 1 ? "Please enter your date of Birth" : null,
      age: (value) => (value.length < 1 ? "Please enter your Age" : null),
      passport: (value) => (value.length < 1 ? "Please enter passport" : null),
      nationality: (value) =>
        value.length < 1 ? "Please enter nationality" : null,
      origin: (value) => (value.length < 1 ? "Please enter origin" : null),
      domicile: (value) => (value.length < 1 ? "Please enter domicile" : null),
      muncipality: (value) =>
        value.length < 1 ? "Please enter muncipality" : null,
      revenue: (value) => (value.length < 1 ? "Please enter revenue" : null),
      expenses: (value) => (value.length < 1 ? "Please enter expenses" : null),
      aidsBonuses: (value) =>
        value.length < 1 ? "Please enter Aids or Bonuses" : null,
      debt: (value) => (value.length < 1 ? "Please enter debt" : null),
      housing: (value) => (value.length < 1 ? "Please enter housing" : null),
      education: (value) =>
        value.length < 1 ? "Please enter education level" : null,
      char: (value) =>
        value.length < 1 ? "Please enter Characteristics" : null,
      training: (value) =>
        value.length < 1 ? "Please enter Complementary Trainging " : null,
      realization: (value) =>
        value.length < 1 ? "Please enter realization year" : null,
    },
  });

  const deleteRefrences = (id) => {
    console.log(id);
    let a = refrences.filter((item) => item.id !== id);
    setRefrences(a);
  };

  const submitAll = (values) => {
    setActive(active + 1);
    setAlldata(values);
  };
  return (
    <Container size="lg">
      <form
        className={classes.form}
        onSubmit={form.onSubmit(() => {
          submitAll(form.values);
        })}
      >
        <Text className={classes.subHeading}>Personal Information</Text>
        <Divider color="#C8C8C8" mt="md" mb="md" />
        <SimpleGrid
          breakpoints={[
            { minWidth: "md", cols: 2 },
            { minWidth: "lg", cols: 3 },
            { minWidth: "xs", cols: 1 },
          ]}
        >
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
            validateName="dateOfBirth"
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

        {/** Studies and training */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Studies and Training</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 3 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
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
        </Card>

        {/* Work Experience */}
        <Card>
          <Text className={classes.subHeading}>Work Experience</Text>
          <Group position="right">
            <Button
              label={"Add New"}
              primary={true}
              leftIcon={"plus"}
              className={classes.btn}
              onClick={() => setOpenModal(true)}
            />
          </Group>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <Table headCells={headerData2} rowData={workExperience} />
          <Divider color="#C8C8C8" mt="md" mb="md" />
        </Card>

        {/* Descrimation and voilence */}
        <Card mt="sm">
          <Text className={classes.subHeading}>
            Discrimination And Voilence
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 3 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <InputField
              label="Labour"
              required={true}
              placeholder="labour"
              form={form}
              validateName="labour"
            />
            <InputField
              label="educational"
              required={true}
              placeholder="educational"
              form={form}
              validateName="educational"
            />
            <InputField
              label="Institutional"
              required={true}
              placeholder="institutional"
              form={form}
              validateName="institutional"
            />
            <InputField
              label="Familiar"
              required={true}
              placeholder="familiar"
              form={form}
              validateName="familiar"
            />
            <InputField
              label="Social"
              required={true}
              placeholder="social"
              form={form}
              validateName="social"
            />
          </SimpleGrid>
        </Card>

        {/* Socio Family */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Socio-Family Situation</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <TextArea
            label="Marital Status - Family Composition - Social Network"
            form={form}
            validateName="socioFamily"
          />
        </Card>

        {/* Economic Situation */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Economic Situation</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 3 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
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
              validateName="aidsBonuses"
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
        </Card>

        {/* Health Aspects */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Health Aspects</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <TextArea
            label="Disability - Dependencies - Mental Health"
            form={form}
            validateName="healthAspects"
          />
        </Card>

        <Text className={classes.subHeading}>Professional References</Text>
        <Group position="right">
          <Button
            label={"Add New"}
            primary={true}
            leftIcon={"plus"}
            className={classes.btn}
            onClick={() => setOpenViewModal(true)}
          />
        </Group>
        <Divider color="#C8C8C8" mt="xl" mb="md" />
        <Table headCells={headerData} rowData={refrences} />
        <Divider color="#C8C8C8" mt="md" mb="md" />

        {/* Demand*/}
        <Card mt="sm">
          <Text className={classes.subHeading}>Demand</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <TextArea label="Demand" form={form} validateName="demand" />
        </Card>

        {/* Tracking */}
        <Card>
          <Text className={classes.subHeading}>Tracking</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <TextArea label="Tracking" form={form} validateName="tracking" />
        </Card>

        <Group position="center" mt="xl">
          <Button onClick={() => setActive(active - 1)} label="Back" />
          <Button label={"Save & Next"} primary={true} type="submit" />
        </Group>
      </form>
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="Add Professional References"
      >
        <NewProfessionalModal
          setOpenViewModal={setOpenViewModal}
          refrences={refrences}
          setRefrences={setRefrences}
        />
      </ViewModal>
      <ViewModal
        opened={openModal}
        setOpened={setOpenModal}
        title="Add Work Experience"
      >
        <NewWorkModal
          workExperience={workExperience}
          setOpenModal={setOpenModal}
          setWorkExperience={setWorkExperience}
        />
      </ViewModal>
    </Container>
  );
};
