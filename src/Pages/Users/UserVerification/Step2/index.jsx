import {
  Card,
  Container,
  Divider, FileInput, Group, Radio, SimpleGrid,
  Text
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { FileUpload, Trash } from "tabler-icons-react";
import Button from "../../../../Components/Button";
import Datepicker from "../../../../Components/Datepicker";
import DeleteModal from "../../../../Components/DeleteModal";
import InputField from "../../../../Components/InputField";
import Table from "../../../../Components/Table";
import TextArea from "../../../../Components/TextArea";
import ViewModal from "../../../../Components/ViewModal/viewUser";
import { backendUrl, s3Config } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
import { useStyles } from "../styles";
import NewProfessionalModal from "./NewProfessional";
import NewTrainingModal from "./NewStudiesTraining";
import NewWorkModal from "./NewWorkExperience";

export const Step2 = ({
  setActive,
  active,
  setAlldata,
  alldata,
  workExperience,
  setWorkExperience,
  refrences,
  setRefrences,
  trainingStudies,
  setTrainingStudies,
  userdata,
  form,
  id,
}) => {
  const { classes } = useStyles();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openTrainingModal, setopenTrainingModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const { user } = useContext(UserContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteModal1, setOpenDeleteModal1] = useState(false);
  const [openDeleteModal2, setOpenDeleteModal2] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [descrimation, setDescrimation] = useState();

  let headerData = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "Sr No.",
    },
    {
      id: "fullName",
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
      id: "relation",
      numeric: false,
      disablePadding: true,
      label: "Relation",
    },
    {
      id: "actions",
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
    
      delete: <Trash color="red" />,
      numeric: false,
      label: "Actions",
    },
  ];
  let headerData3 = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "Sr No.",
    },
    {
      id: "educationLevel",
      numeric: false,
      disablePadding: true,
      label: "Education Level",
    },
    {
      id: "specialization",
      numeric: false,
      disablePadding: true,
      label: "Specialization",
    },
    {
      id: "complementaryTraining",
      numeric: false,
      disablePadding: true,
      label: "Complementary Training",
    },
    {
      id: "completionYear",
      numeric: false,
      disablePadding: true,
      label: "Completion Year",
    },

    {
      id: "actions",
     
      delete: <Trash color="red" />,
      numeric: false,
      label: "Actions",
    },
  ];
  const { data1, status1 } = useQuery(
    "getDescrimination",
    () => {
      return axios.get(
        `${backendUrl + `/api/lookup/getLookupByType/discrimination`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        setDescrimation(response.data.data);
      },
    }
  );
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
        form.setFieldValue("email", response.data.data?.email);
        form.setFieldValue("firstName", response.data.data?.firstName);
        form.setFieldValue("lastName", response.data.data?.lastName);
        form.setFieldValue("phoneNo", response.data.data?.phoneNumber);
      },
    }
  );
  const handleDeleted = (id, type) => {
    if (type === "w") {
      let a = workExperience.filter((item) => item.id !== id);
      setWorkExperience(a);
    } else if (type === "s") {
      let a = refrences.filter((item) => item.id !== id);
      setRefrences(a);
    } else {
      let a = trainingStudies.filter((item) => item.id !== id);
      setTrainingStudies(a);
    }
    setOpenDeleteModal(false);
    setOpenDeleteModal1(false);
    setOpenDeleteModal2(false);
  };

  const handleFileInput = (file) => {
    setSelectedFile(file);
    const ReactS3Client = new AWS.S3(s3Config);
    ReactS3Client.send(file)
      .then((data) => console.log(data.location))
      .catch((err) => console.error(err));
  };

  const submitAll = (values) => {
    if(refrences.length===0){
      showNotification({
        title: "Add Refrences",
        message: "Please add Professional references",
        color:"red.0"
      })
    }else if(trainingStudies.length===0){
      showNotification({
        title: "Add Training Studies",
        message: "Please add Training Studies",
        color:"red.0"
      })
    }else if(workExperience.length===0){
      showNotification({
        title: "Add Work Experience",
        message: "Please add Work Experience",
        color:"red.0"
      })

    }else{
      setActive(active + 1);
      setAlldata(values);
    }
    
  };

  return (
    <Container size="lg" p={"0px"}>
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
            validateName="phoneNo"
          />
          <InputField
            label="Country"
            required={true}
            placeholder="country"
            form={form}
            validateName="country"
          />
          <InputField
            label="City"
            required={true}
            placeholder="city"
            form={form}
            validateName="city"
          />
          <InputField
            label="Address"
            required={true}
            placeholder="address"
            form={form}
            validateName="address"
          />
        </SimpleGrid>
        <SimpleGrid
          breakpoints={[
            { minWidth: "md", cols: 2 },
            { minWidth: "lg", cols: 2 },
            { minWidth: "xs", cols: 1 },
          ]}
        >
          <Radio.Group
            label="Select Identity"
            spacing="xl"
            offset="xl"
            withAsterisk
            styles={(theme) => ({
              label: {
                fontSize: "16px",
              },
            })}
            {...form?.getInputProps("documentType")}
          >
            <Radio color="green.0" value="passport" label="Passport" checked />
            <Radio color="green.0" value="nationalId" label="National ID" />
            <Radio
              color="green.0"
              value="residentialId"
              label="Residential ID"
            />
          </Radio.Group>
          {/* <Stack> */}
          <FileInput
            label="Upload Document"
            placeholder="Upload Document"
            accept="file/pdf"
            styles={(theme) => ({
              root: {
                margin: "auto",
              },
              input: {
                border: "1px solid rgb(0, 0, 0, 0.1)",
                borderRadius: "5px",
                // width: "250px",
              },
            })}
            icon={<FileUpload size={20} />}
            onChange={(e)=>handleFileInput(e)}
          />
        </SimpleGrid>

        {/** Studies and training */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Studies and Training*</Text>

          <Group position="right">
            <Button
              label={"Add New"}
              primary={true}
              leftIcon={"plus"}
              className={classes.btn}
              onClick={() => setopenTrainingModal(true)}
            />
          </Group>
          <Divider color="#C8C8C8" mt="md" mb="md" />

          <Table
            headCells={headerData3}
            rowData={trainingStudies}
            setDeleteModalState={setOpenDeleteModal}
            setDeleteData={setDeleteID}
          />
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
            {...form?.getInputProps("typeId")}
          >
            {descrimation?.map((item) => (
              <Radio color="green.0" value={item._id} label={item.lookupName} />
            ))}
          </Radio.Group>
          <Divider color="white" mt="sm" mb="sm" />
          <TextArea
            label="Description"
            form={form}
            validateName="discriminationVoilenceValue"
          />
        </Card>

        {/* Work Experience */}
        <Card>
          <Text className={classes.subHeading}>Work Experience*</Text>
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
          <Table
            headCells={headerData2}
            rowData={workExperience}
            setDeleteModalState={setOpenDeleteModal1}
            setDeleteData={setDeleteID}
          />
          <Divider color="#C8C8C8" mt="md" mb="md" />
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
              placeholder="$$"
              form={form}
              type={"number"}
              validateName="revenue"
            />
            <InputField
              label="Expenses"
              required={true}
              placeholder="$$"
              type={"number"}
              form={form}
              validateName="expenses"
            />
            <InputField
              label="Aids or Bonuses"
              required={true}
              type={"number"}
              placeholder="$$"
              form={form}
              validateName="aidsBonuses"
            />
            <InputField
              label="Debit"
              required={true}
              placeholder="$$"
              type={"number"}
              form={form}
              validateName="debt"
            />
            <InputField
              label="Housing"
              required={true}
              placeholder="$$"
              type={"number"}
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
            placeholder="Explain in detail"
            validateName="healthAspects"
          />
        </Card>

        {/* Professional References */}
        <Text className={classes.subHeading}>Professional References*</Text>
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
        <Table
          headCells={headerData}
          rowData={refrences}
          setDeleteModalState={setOpenDeleteModal2}
          setDeleteData={setDeleteID}
        />
        <Divider color="#C8C8C8" mt="md" mb="md" />

        {/* Demand*/}
        <Card mt="sm">
          <Text className={classes.subHeading}>Demand</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <TextArea
            form={form}
            validateName="demand"
            placeholder="Explain in detail"
          />
        </Card>

        <Group position="center" mt="xl">
          <Button
            onClick={() => setActive(active - 1)}
            label="Back"
            primary={true}
          />
          <Button label={"Save & Next"} bg={true} type="submit" />
        </Group>
      </form>
      <DeleteModal
        opened={openDeleteModal}
        setOpened={setOpenDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={() => handleDeleted(deleteID, "p")}
        label="Are you Sure?"
        message="Do you really want to delete these records? This process cannot be undone."
      />
      <DeleteModal
        opened={openDeleteModal1}
        setOpened={setOpenDeleteModal1}
        onCancel={() => setOpenDeleteModal1(false)}
        onDelete={() => handleDeleted(deleteID, "w")}
        label="Are you Sure?"
        message="Do you really want to delete these records? This process cannot be undone."
      />
      <DeleteModal
        opened={openDeleteModal2}
        setOpened={setOpenDeleteModal2}
        onCancel={() => setOpenDeleteModal2(false)}
        onDelete={() => handleDeleted(deleteID, "s")}
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
      <ViewModal
        opened={openTrainingModal}
        setOpened={setopenTrainingModal}
        title="Add Studies and Training"
      >
        <NewTrainingModal
          trainingStudies={trainingStudies}
          setopenTrainingModal={setopenTrainingModal}
          setTrainingStudies={setTrainingStudies}
        />
      </ViewModal>
    </Container>
  );
};
