import {
  Anchor, FileInput, Grid, Tabs, Text
} from "@mantine/core";
import React, { useState } from "react";
import { FileUpload } from "tabler-icons-react";
import TextArea from "../../../../Components/TextArea";
import { s3Config } from "../../../../constants/constants";
import { useStyles } from "../styles";
import { UserInfo } from "../userInformation";
const DoubleTabs = ({
  selectedUser,
  setReportFiles,
  reportFiles,
  privatereportFiles,
  setPrivateReportFiles,
}) => {
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [document, setDocument] = useState();
  const [comments, setcomments] = useState("");
  const { classes } = useStyles();

  const handleFileInput = (file, type) => {
    console.log("file", file);
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
      // console.log(AWS.config.credentials);
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
            console.log("link", link);
            type === "public"
              ? setReportFiles({
                  ...reportFiles,
                  reportFile: link,
                })
              : setPrivateReportFiles({
                  ...privatereportFiles,
                  reportFile: link,
                });
          }
        });
      }
      // setFileLoader(false);
    });
  };
  return (
    <>
      <Tabs
        classNames={{
          root: classes.tab,
          tabsList: classes.tabList,
          tab: classes.tabs,
        }}
        defaultValue="public"
        variant="pills"
        color={"blue.0"}
      >
        <Tabs.List position="center">
          <Tabs.Tab value="public">Upload Public Report</Tabs.Tab>
          <Tabs.Tab value="private">Upload Private Report</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="public" pt="xs">
          <Text fz={20} fw="bolder" align="center" mb={"md"}>
            Upload Public Report
          </Text>
          <Grid mt={30} justify="space-between">
            <Grid.Col md={6} xs={5}>
              <UserInfo userData={selectedUser} />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextArea
                rows={5}
                label="Add Comments"
                placeholder={"Enter Comments"}
                value={reportFiles?.reportComments}
                onChange={(e) =>
                  setReportFiles({
                    ...reportFiles,
                    reportComments: e.target.value,
                  })
                }
              />
              <ul>
                {files.length > 0 &&
                  files.map((obj) => (
                    <li>
                      <Anchor>{obj?.name}</Anchor>
                    </li>
                  ))}
              </ul>

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
                    width: "200px",
                  },
                })}
                icon={<FileUpload size={20} />}
                onChange={(e) => handleFileInput(e, "public")}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="private" pt="xs">
          <Text fz={20} fw="bolder" align="center" mb={"md"}>
            Upload Private Report
          </Text>
          <Grid mt={30} justify="space-between">
            <Grid.Col md={6} xs={5}>
                <UserInfo userData={selectedUser} />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextArea
                label="Add Comments"
                placeholder={"Enter Comments"}
                rows={5}
                value={privatereportFiles?.reportComments}
                onChange={(e) =>
                  setPrivateReportFiles({
                    ...privatereportFiles,
                    reportComments: e.target.value,
                  })
                }
              />
              <ul>
                {files2.length > 0 &&
                  files2.map((obj) => (
                    <li>
                      <Anchor>{obj?.name}</Anchor>
                    </li>
                  ))}
              </ul>

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
                    width: "200px",
                  },
                })}
                icon={<FileUpload size={20} />}
                onChange={(e) => handleFileInput(e, "private")}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default DoubleTabs;
