import { useContext, useState } from "react";
import {
  Card,
  Container,
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Text,
  useMantineTheme,
  Radio 
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
import Datepicker from "../../../../Components/Datepicker";

import DeleteModal from "../../../../Components/DeleteModal";
import { useQuery } from "react-query";
import axios from "axios";

import { backendUrl } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
export const Step2 = ({
  setActive,
  active,
  setAlldata,
  alldata,
  workExperience,
  setWorkExperience,
  refrences,
  setRefrences,
  userdata,
  form,
  id,
}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const { user } = useContext(UserContext);
const [openDeleteModal, setOpenDeleteModal] = useState(false);


  // console.log(id);
  console.log("id",deleteID)
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
      label: "Position",
    },
    {
      id: "contract",
      numeric: false,
      disablePadding: true,
      label: "Job Type",
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

  const { data, status } = useQuery(
    "fetchUserbyId",
    () => {
      return axios.get(`${backendUrl + `/api/user/listSingleUser/${id}`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        console.log(response.data.data);
        form.setFieldValue("email", response.data.data?.email);
        form.setFieldValue("firstName", response.data.data?.firstName);
        form.setFieldValue("lastName", response.data.data?.lastName);
        form.setFieldValue("phoneNumber", response.data.data?.phoneNumber);
      },
    }
  );
  const handleDeleted = (id) => {
    console.log(id);
    let a = refrences.filter((item) => 
    console.log(item));
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
            value={alldata?.firstName}
            disabled={true}
            form={form}
            validateName="firstName"
          />
          <InputField
            label="Last Name"
            value={alldata?.lastName}
            required={true}
            disabled={true}
            placeholder="Last Name"
            form={form}
            validateName="lastName"
          />
      
          <InputField
            label="Email "
            required={true}
            placeholder="email@gmail.com"
            form={form}
            validateName="email"
            disabled={true}
          />
          <Datepicker
            label="Date of Birth"
            required={true}
            placeholder="Date of Birth"
            form={form}
            validateName="dateOfBirth"
          />
          <InputField
            label="Age"
            required={true}
            type="number"
            placeholder="age"
            disabled={true}
            form={form}
            validateName="age"
          />
           <InputField
            label="Phone Number"
            value={alldata?.lastName}
            required={true}
            disabled={true}
            placeholder="phone number"
            form={form}
            validateName="phoneNumber"
          />
          <InputField
            label="Country"
            required={true}
            placeholder="country"
            form={form}
            validateName="origin"
          />
          <InputField
            label="City"
            required={true}
            placeholder="city"
            form={form}
            validateName="muncipality"
          />
          <InputField
            label="Address"
            required={true}
            placeholder="address"
            form={form}
            validateName="domicile"
          />
          

          {/* <InputField
            label="Passport"
            required={true}
            placeholder="FN2342444"
            form={form}
            validateName="passport"
          /> */}
          {/* <InputField
            label="Nationality"
            required={true}
            placeholder="Pakistani"
            form={form}
            validateName="nationality"
          /> */}
        </SimpleGrid>
        <Radio.Group
      name="favoriteFramework"
      label="Select Identity"
      // description="This is anonymous"
      spacing="xl"
      offset="xl"
      withAsterisk
    >
      <Radio value="passport" label="Passport" />
      <Radio value="nationality" label="Nationality" />
      <Radio value="residence" label="Residence" />
     
    </Radio.Group>

        {/** Studies and training */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Studies and Training</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 4 },
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
              label="Complementary Training"
              required={true}
              placeholder="training"
              form={form}
              validateName="training"
            />
            <InputField
              label="Completion Year"
              required={true}
              placeholder="Completion Year"
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
          <Table headCells={headerData2} rowData={workExperience} setDeleteModalState={setOpenDeleteModal} setDeleteData={setDeleteID} />
          <Divider color="#C8C8C8" mt="md" mb="md" />
        </Card>

        {/* Descrimation and voilence */}
        <Card mt="sm">
          <Text className={classes.subHeading}>
            Discrimination And Voilence
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <Radio.Group
      name="favoriteFramework"
      label="Select Identity"
      // description="This is anonymous"
      spacing="xl"
      offset="xl"
      withAsterisk
    >
      <Radio value="passport" label="Labour" />
      <Radio value="nationality" label="Educational" />
      <Radio value="residence" label="Institutional" />
      <Radio value="residence" label="Familiar" />
      <Radio value="residence" label="Social" />
     

    </Radio.Group>
    <Divider color="white" mt="sm" mb="sm" />
    <TextArea
            label="Description"
            form={form}
            // validateName="healthAspects"
          />

          {/* <SimpleGrid
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
              label="Educational"
              required={true}
              placeholder="Educational"
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
          </SimpleGrid> */}
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
              { minWidth: "md", cols: 3 },
              { minWidth: "lg", cols: 5 },
              { minWidth: "xs", cols: 2 },
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
              label="Debit"
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
          <TextArea form={form} validateName="demand" />
        </Card>

        <Group position="center" mt="xl">
          <Button onClick={() => setActive(active - 1)} label="Back" />
          <Button label={"Save & Next"} primary={true} type="submit" />
        </Group>
        
      </form>
      <DeleteModal
        opened={openDeleteModal}
        setOpened={setOpenDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={()=>handleDeleted(deleteID)}
        label="Are you Sure?"
        message="Do you really want to delete these records? This process cannot be undone."
      />
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
