import React, { useContext, useState } from "react";
import {
  SimpleGrid,
  Container,
  Flex,
  Text,
  useMantineTheme,
  Divider,
  FileInput,
} from "@mantine/core";
import { useStyles } from "../styles";
import DoubleTabs from "./Tabs";
import InputField from "../../../../Components/InputField";
import Button from "../../../../Components/Button";

import { Dropzone } from "@mantine/dropzone";
import { UserContext } from "../../../../contexts/UserContext";
import { FileUpload } from "tabler-icons-react";
import { s3Config } from "../../../../constants/constants";
const Step3 = ({
  selectedUser,
  caseNo,
  reportFiles,
  setReportFiles,
  setPrivateReportFiles,
  privatereportFiles,
  otherDocument,
  setOtherDocument
}) => {
  const { user } = useContext(UserContext);
  // console.log("User", user)
  const [numInputs, setNumInputs] = useState([1]);
  // const [otherDocument, setOtherDocument] = useState([{
  //   documentName: "",
  //   documentURL: "",
  //   createdBy: user.id
  // }]);

  console.log("otherDocument", otherDocument)

  function addInputField(id) {
    setNumInputs([...numInputs, id]);

    const obj={
      documentName: "",
      documentURL: "",
      createdBy: user.id
    }
    setOtherDocument([...otherDocument,obj])
  }

  const handleFileInput = (file,index) => {
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
            otherDocument[index].documentURL=link
            setOtherDocument([...otherDocument])
          }
        });
      }
      // setFileLoader(false);
    });
  };

  return (
    <Container size="lg">
      <Flex justify={"space-between"}>
        <SimpleGrid cols={2}>
          <Text fz={18} fw={"bold"}>
            Case#
          </Text>
          <Text>{caseNo}</Text>
        </SimpleGrid>
        <Flex align={"center"}>
          <Text fz={18} fw={"bold"}>
            Date:
          </Text>
          <Text ml={10}>XXXX</Text>
        </Flex>
      </Flex>
      <DoubleTabs
        selectedUser={selectedUser}
        setReportFiles={setReportFiles}
        privatereportFiles={privatereportFiles}
        reportFiles={reportFiles}
        setPrivateReportFiles={setPrivateReportFiles}
      />
                <Divider color="#C8C8C8" mt="md" mb="md" />

      <Text>Upload other Documents</Text>

      {numInputs?.map((i, index) => (
        <SimpleGrid breakpoints={[
          { minWidth: "md", cols: 2 },
          { minWidth: "sm", cols: 1 },
        ]}>
          <InputField
            label={"Document Name"}
            placeholder="enter document name"
            onChange={(e)=>{
              // update value at current index in other document array
              otherDocument[index].documentName=e.target.value
              // update array (pass by value) for re-render
              setOtherDocument([...otherDocument])
            }}
           
          />
          {/* <Dropzone
          // accept={MIME_TYPES.pdf}
          onDrop={(v) => {
            
            otherDocument[index].documentURL=""
            setOtherDocument([...otherDocument])
          }}
          >
            <Button label={"Upload "} leftIcon="upload2" bg={true} />
          </Dropzone> */}
          
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
            onChange={(e) => handleFileInput(e,index)}
          />
        </SimpleGrid>
      ))}
      <Button
        label={"Other Documents"}
        onClick={() => addInputField(2)}
        bg={true}
      />
    </Container>
  );
};

export default Step3;
