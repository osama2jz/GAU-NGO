import {
  Card,
  Container,
  Divider,
  FileInput,
  Group,
  Radio,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Edit, FileUpload, Trash } from "tabler-icons-react";
import Button from "../../../../Components/Button";
import Datepicker from "../../../../Components/Datepicker";
import DeleteModal from "../../../../Components/DeleteModal";
import InputField from "../../../../Components/InputField";
import Loader from "../../../../Components/Loader";
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
  const { user, translate } = useContext(UserContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteModal1, setOpenDeleteModal1] = useState(false);
  const [openDeleteModal2, setOpenDeleteModal2] = useState(false);
  const [editData, setEditData] = useState("");
  const [descrimation, setDescrimation] = useState();
  const [fileLoader, setFileLoader] = useState(false);

  const { editId } = useParams();

  let headerData = [
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
      edit: <Edit color={"green"} />,
      delete: <Trash color="red" />,
      numeric: false,
      label: "Actions",
    },
  ];
  let headerData2 = [
    {
      id: "position",
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
      id: "noOfYears",
      numeric: false,
      disablePadding: true,
      label: "Years",
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
      edit: <Edit color={"green"} />,
      delete: <Trash color="red" />,
      numeric: false,
      label: "Actions",
    },
  ];
  let headerData3 = [
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
      edit: <Edit color={"green"} />,
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
    setFileLoader(true);
    //s3 configs
    const aws = new AWS.S3();
    AWS.config.region = s3Config.region;

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: s3Config.IdentityPoolId,
    });

    AWS.config.credentials.get(function (err) {
      if (err) alert(err);
    });
    var bucket = new AWS.S3({
      params: {
        Bucket: s3Config.bucketName,
      },
    });
    var objKey = file.name;
    var params = {
      Key: objKey,
      ContentType: file.type,
      Body: file,
      ACL: "public-read",
    };
    bucket.upload(params, function (err, data) {
      if (err) {
        results.innerHTML = "ERROR: " + err;
      } else {
        bucket.listObjects(function (err, data) {
          if (err) {
            showNotification({
              title: translate("Upload Failed"),
              message: translate("Something went Wrong"),
              color: "red.0",
            });
          } else {
            let link = "https://testing-buck-22.s3.amazonaws.com/" + objKey;
            form.setFieldValue("documentURL", link);
          }
        });
      }
      setFileLoader(false);
    });
  };

  const submitAll = (values) => {
    if (refrences.length === 0) {
      showNotification({
        title: translate("Add Professional References"),
        message: translate("Please add Professional references"),
        color: "red.0",
      });
    } else if (trainingStudies.length === 0) {
      showNotification({
        title: translate("Add Studies and Training"),
        message: translate("Please add Training Studies"),
        color: "red.0",
      });
    } else if (workExperience.length === 0) {
      showNotification({
        title: translate("Add Work Experience"),
        message: translate("Please add Work Experience"),
        color: "red.0",
      });
    } else {
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
        <Text className={classes.subHeading}>
          {translate("Personal Information")}
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
            label="First Name"
            required={true}
            placeholder="First Name"
            value={alldata?.firstName}
            // disabled={true}
            disabled={editId ? false : true}
            form={form}
            validateName="firstName"
          />
          <InputField
            label="Last Name"
            value={alldata?.lastName}
            required={true}
            disabled={editId ? false : true}
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
          {/* <InputField
            label="Age"
            required={true}
            type="number"
            placeholder="age"
            disabled={editId ? false : true}
            form={form}
            validateName="age"
          /> */}
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
        <Group align={"flex-end"}>
          <Radio.Group
            label={translate("Select Identity")}
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
            <Radio
              color="green.0"
              value="passport"
              label={translate("Passport")}
              checked
            />
            <Radio
              color="green.0"
              value="nationalId"
              label={translate("National ID")}
            />
            <Radio
              color="green.0"
              value="residentialId"
              label={translate("Residential ID")}
            />
          </Radio.Group>

          <FileInput
            label={translate("Upload Document")}
            placeholder={translate("Upload Document")}
            accept="file/pdf"
            styles={(theme) => ({
              input: {
                border: "1px solid rgb(0, 0, 0, 0.5)",
                borderRadius: "5px",
                // width: "250px",
              },
              placeholder: {
                color: "black !important",
              },
            })}
            icon={<FileUpload size={20} color="green" />}
            onChange={(e) => handleFileInput(e)}
          />
        </Group>

        {/** Studies and training */}
        <Card mt="sm">
          <Text className={classes.subHeading}>
            {translate("Studies and Training")}*
          </Text>
          {trainingStudies.length < 1 && (
            <Text color="red" align="center">{translate("Required")}</Text>
          )}
          <Group position="right">
            <Button
              label={"Add New"}
              primary={true}
              leftIcon={"plus"}
              className={classes.btn}
              onClick={() => {
                setopenTrainingModal(true);
                setEditData("");
              }}
            />
          </Group>
          <Divider color="#C8C8C8" mt="md" mb="md" />

          <Table
            headCells={headerData3}
            rowData={trainingStudies}
            setDeleteModalState={setOpenDeleteModal}
            setDeleteData={setDeleteID}
            setReportData={setEditData}
            setEditModalState={setopenTrainingModal}
          />
        </Card>

        {/* Descrimation and voilence */}
        <Card mt="sm">
          <Text className={classes.subHeading}>
            {translate("Discrimination And Voilence")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <Radio.Group
            name="favoriteFramework"
            label={translate("Select Identity")}
            // description="This is anonymous"
            spacing="xl"
            offset="xl"
            withAsterisk
            {...form?.getInputProps("typeId")}
          >
            {descrimation?.map((item) => (
              <Radio
                color="green.0"
                value={item._id}
                label={translate(item.lookupName)}
              />
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
          <Text className={classes.subHeading}>
            {translate("Work Experience")}*
          </Text>
          {workExperience.length < 1 && (
            <Text color="red" align="center">{translate("Required")}</Text>
          )}
          <Group position="right">
            <Button
              label={"Add New"}
              primary={true}
              leftIcon={"plus"}
              className={classes.btn}
              onClick={() => {
                setOpenModal(true);
                setEditData("");
              }}
            />
          </Group>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <Table
            headCells={headerData2}
            rowData={workExperience}
            setDeleteModalState={setOpenDeleteModal1}
            setDeleteData={setDeleteID}
            setReportData={setEditData}
            setEditModalState={setOpenModal}
          />
          <Divider color="#C8C8C8" mt="md" mb="md" />
        </Card>

        {/* Socio Family */}
        <Card mt="sm">
          <Text className={classes.subHeading}>
            {translate("Socio-Family Situation")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <TextArea
            label="Marital Status - Family Composition - Social Network"
            form={form}
            validateName="socioFamily"
          />
        </Card>

        {/* Economic Situation */}
        <Card mt="sm">
          <Text className={classes.subHeading}>
            {translate("Economic Situation")}
          </Text>
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
              placeholder="€€"
              form={form}
              type={"number"}
              validateName="revenue"
            />
            <InputField
              label="Expenses"
              required={true}
              placeholder="€€"
              type={"number"}
              form={form}
              validateName="expenses"
            />
            <InputField
              label="Aids or Bonuses"
              required={true}
              // type={"number"}
              placeholder="€€"
              form={form}
              validateName="aidsBonuses"
            />
            <InputField
              label="Debit"
              required={true}
              placeholder="€€"
              type={"number"}
              form={form}
              validateName="debt"
            />
            <InputField
              label="Housing"
              required={true}
              placeholder="€€"
              // type={"number"}
              form={form}
              validateName="housing"
            />
          </SimpleGrid>
        </Card>

        {/* Health Aspects */}
        <Card mt="sm">
          <Text className={classes.subHeading}>
            {translate("Health Aspects")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <TextArea
            label="Disability - Dependencies - Mental Health"
            form={form}
            placeholder="Explain in detail"
            validateName="healthAspects"
          />
        </Card>

        {/* Professional References */}
        <Text className={classes.subHeading}>
          {translate("Professional References")}*
        </Text>
        {refrences.length < 1 && (
            <Text color="red" align="center">{translate("Required")}</Text>
          )}
        <Group position="right">
          <Button
            label={"Add New"}
            primary={true}
            leftIcon={"plus"}
            className={classes.btn}
            onClick={() => {
              setOpenViewModal(true);
              setEditData("");
            }}
          />
        </Group>
        <Divider color="#C8C8C8" mt="xl" mb="md" />
        <Table
          headCells={headerData}
          rowData={refrences}
          setDeleteModalState={setOpenDeleteModal2}
          setDeleteData={setDeleteID}
          setReportData={setEditData}
          setEditModalState={setOpenViewModal}
        />
        <Divider color="#C8C8C8" mt="md" mb="md" />

        {/* Demand*/}
        <Card mt="sm">
          <Text className={classes.subHeading}>{translate("Demand")}</Text>
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
        title={
          editData
            ? "Edit Professional References"
            : "Add Professional References"
        }
      >
        <NewProfessionalModal
          setOpenViewModal={setOpenViewModal}
          refrences={refrences}
          setRefrences={setRefrences}
          editData={editData}
          setEditData={setEditData}
        />
      </ViewModal>
      <ViewModal
        opened={openModal}
        setOpened={setOpenModal}
        title={editData ? "Edit Work Experience" : "Add Work Experience"}
      >
        <NewWorkModal
          workExperience={workExperience}
          setOpenModal={setOpenModal}
          setWorkExperience={setWorkExperience}
          editData={editData}
          setEditData={setEditData}
        />
      </ViewModal>
      <ViewModal
        opened={openTrainingModal}
        setOpened={setopenTrainingModal}
        title={
          editData ? "Edit Studies and Training" : "Add Studies and Training"
        }
      >
        <NewTrainingModal
          trainingStudies={trainingStudies}
          setopenTrainingModal={setopenTrainingModal}
          setTrainingStudies={setTrainingStudies}
          editData={editData}
          setEditData={setEditData}
        />
      </ViewModal>
    </Container>
  );
};
