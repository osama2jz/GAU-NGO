import {
  Checkbox,
  Container,
  Divider,
  FileInput,
  Flex,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import Button from "../../../../Components/Button";
import InputField from "../../../../Components/InputField";
import DoubleTabs from "./Tabs";
import { FileUpload } from "tabler-icons-react";
import { s3Config } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
import jsPDF from "jspdf";

const Step3 = ({
  selectedUser,
  caseNo,
  reportFiles,
  setFileLoader,
  setReportFiles,
  setPrivateReportFiles,
  privatereportFiles,
  otherDocument,
  setOtherDocument,
  setPrivateReportCheck,
  privateReportCheck,
  editorr2,
  editorr,
  publicRef,
  setAttachedDocs,
}) => {
  const { user, translate } = useContext(UserContext);

  const addInputField = () => {
    if (
      otherDocument.length === 0 ||
      otherDocument[otherDocument.length - 1].documentName !== ""
    ) {
      const obj = {
        documentName: "",
        documentURL: "",
        createdBy: user.id,
      };
      setOtherDocument([...otherDocument, obj]);
    }
  };

  const handleFileInput = (file, index) => {
    setFileLoader(true);
    //s3 configs
    const fileName = file.name;
    const sanitizedFileName = fileName.replace(/\s+/g, "");
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
    var objKey = sanitizedFileName;
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
            setFileLoader(false);
          }
        });
      }
    });
  };
  return (
    <Container size="lg">
      <Flex justify={"space-between"}>
        <SimpleGrid cols={2}>
          <Text fz={18} fw={"bold"}>
            {translate("Case")}#
          </Text>
          <Text>{caseNo}</Text>
        </SimpleGrid>
      </Flex>
      <DoubleTabs
        selectedUser={selectedUser}
        setReportFiles={setReportFiles}
        privatereportFiles={privatereportFiles}
        reportFiles={reportFiles}
        setPrivateReportFiles={setPrivateReportFiles}
        setPrivateReportCheck={setPrivateReportCheck}
        privateReportCheck={privateReportCheck}
        setFileLoader={setFileLoader}
        editorr2={editorr2}
        editorr={editorr}
        publicRef={publicRef}
      />
      <Divider color="#C8C8C8" mt="md" mb="md" />

      <Text align="center" fw={"bolder"}>
        {translate("User's Documents")}
      </Text>
      <Checkbox.Group
        label={translate("Select Documents from user's profile.")}
        description={translate("These are uploaded by user into his profile.")}
        onChange={(v)=>setAttachedDocs(v)}
      >
        <Group mt="xs">
          {selectedUser?.data?.documents.map((doc, key) => (
            <Checkbox value={doc._id} label={doc?.documentTitle} key={key}/>
          ))}
        </Group>
      </Checkbox.Group>
      <Divider color="#C8C8C8" mt="md" mb="md" />

      <Text align="center" fw={"bolder"}>
        {translate("Other Documents")}
      </Text>

      {otherDocument?.map((i, index) => (
        <SimpleGrid
          breakpoints={[
            { minWidth: "md", cols: 2 },
            { minWidth: "sm", cols: 1 },
          ]}
        >
          <InputField
            label={"Document Name"}
            placeholder="Enter document name"
            onChange={(e) => {
              // update value at current index in other document array
              otherDocument[index].documentName = e.target.value;
              // update array (pass by value) for re-render
              setOtherDocument([...otherDocument]);
            }}
          />

          <FileInput
            label={translate("Upload Document")}
            placeholder={translate("Upload Document")}
            accept="file/pdf"
            styles={(theme) => ({
              root: {
                margin: "auto",
              },
              input: {
                border: "1px solid rgb(0, 0, 0, 0.5)",
                borderRadius: "5px",
                // width: "250px",
              },
              placeholder: {
                color: "black !important",
              },
            })}
            icon={<FileUpload size={20} color="green"/>}
            onChange={(e) => handleFileInput(e, index)}
          />
        </SimpleGrid>
      ))}
      <Button
        label={"Add Document"}
        onClick={() => addInputField()}
        bg={true}
      />
    </Container>
  );
};

export default Step3;
