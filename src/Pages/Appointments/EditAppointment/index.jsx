import {
  Avatar,
  Badge,
  Container,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Eye } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import routeNames from "../../../Routes/routeNames";
import ViewModal from "../../../Components/ViewModal/viewUser";
import userlogo from "../../../assets/teacher.png";
import { useQuery, useQueryClient } from "react-query";
import { useStyles } from "./styles";
import { UserContext } from "../../../contexts/UserContext";
import { backendUrl } from "../../../constants/constants";
import moment from "moment";
import axios from "axios";
import Loader from "../../../Components/Loader";
import { showNotification } from "@mantine/notifications";
import { s3Config } from "../../../constants/constants";
import { Divider, FileInput } from "@mantine/core";
import { FileUpload } from "tabler-icons-react";
import { UserInfo } from "../CreateAppointment/userInformation";

function EditAppointments() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);

  const [reportData, setReportData] = useState([]);
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState();
  const [loading, setLoading] = useState(false);

  const [numInputs, setNumInputs] = useState([1]);
  const [otherDocument, setOtherDocument] = useState([
    {
      documentName: "",
      documentURL: "",
      createdBy: user.id,
    },
  ]);

  function addInputField(id) {
    setNumInputs([...numInputs, id]);

    const obj = {
      documentName: "",
      documentURL: "",
      createdBy: user.id,
    };
    setOtherDocument([...otherDocument, obj]);
  }

  //selected user
  const { data, status} = useQuery(
    ["userFetchedById"],
    () => {
        setLoading(true);
    //   console.log(user);
      return axios.get(backendUrl + `/api/user/listSingleUser/${id}`, {
        headers: {
          "x-access-token": user?.token,
        },
      });
    },
    {
      cacheTime: 0,
      onSuccess: (response) => {
        
        setSelectedUser(response);
        setLoading(false);
      },
      enabled: !!id,
    }
  );

  const handleFileInput = (file, index) => {
    // setFileLoader(true);
    //s3 configs
    const aws = new AWS.S3();
    AWS.config.region = s3Config.region;
    // console.log(aws);
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: s3Config.IdentityPoolId,
    });

    AWS.config.credentials.get(function (err) {
      if (err) alert(err);
      console.log(AWS.config.credentials);
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
              title: "Upload Failed",
              message: "Something went Wrong",
              color: "red.0",
            });
          } else {
            let link = "https://testing-buck-22.s3.amazonaws.com/" + objKey;
            otherDocument[index].documentURL = link;
            setOtherDocument([...otherDocument]);
          }
        });
      }
      // setFileLoader(false);
    });
  };

  return (
    <Container className={classes.addUser} size="xl" p={"0px"} bg={""}>
      <ContainerHeader label={"Edit Appointment"} />
      <Container p={"xs"} className={classes.innerContainer} size="xl">
        <Container p="sm">
          <Flex justify={"space-between"}>
            <SimpleGrid cols={2}>
              <Text fz={18} fw={"bold"}>
                Case#
              </Text>
              <Text ml={10}>XXXX</Text>
            </SimpleGrid>
          </Flex>
          {loading ? (
            <Loader />
          ) : (
            <Container size={"sm"} p="0px">
              <UserInfo userData={selectedUser} />
            </Container>
          )}

          <Divider color="#C8C8C8" mt="md" mb="md" />

          <Text align="center" fw={"bolder"}>
            Other Documents
          </Text>

          {numInputs?.map((i, index) => (
            <SimpleGrid
              breakpoints={[
                { minWidth: "md", cols: 2 },
                { minWidth: "sm", cols: 1 },
              ]}
            >
              <InputField
                label={"Document Name"}
                placeholder="enter document name"
                onChange={(e) => {
                  // update value at current index in other document array
                  otherDocument[index].documentName = e.target.value;
                  // update array (pass by value) for re-render
                  setOtherDocument([...otherDocument]);
                }}
              />

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
                onChange={(e) => handleFileInput(e, index)}
              />
            </SimpleGrid>
          ))}
          <Button
            label={"Other Documents"}
            onClick={() => addInputField(2)}
            bg={true}
          />
        </Container>
      </Container>
    </Container>
  );
}

export default EditAppointments;
