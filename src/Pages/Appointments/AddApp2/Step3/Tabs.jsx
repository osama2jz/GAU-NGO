import { Tabs, Text } from "@mantine/core";
import jsPDF from "jspdf";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import InputField from "../../../../Components/InputField";
import TextEditor from "../../../../Components/TextEditor";
import { s3Config } from "../../../../constants/constants";
import { useStyles } from "../styles";
import Button from "../../../../Components/Button";

const DoubleTabs = ({
  selectedUser,
  setReportFiles,
  reportFiles,
  privatereportFiles,
  setPrivateReportFiles,
  setPrivateReportCheck,
  setFileLoader,
  editorr,
  editorr2,
  publicRef,
}) => {
  // const [files, setFiles] = useState([]);
  // const [files2, setFiles2] = useState([]);
  const { classes } = useStyles();

  // console.log("editorr",editorr.getHTML())

  // const handleFileInput = (file, type) => {
  //   const fileName = file.name;
  //   const sanitizedFileName = fileName.replace(/\s+/g, "");
  //   setPrivateReportCheck(true);
  //   setFileLoader(true);
  //   //s3 configs
  //   const aws = new AWS.S3();
  //   AWS.config.region = s3Config.region;
  //   // console.log(aws);
  //   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //     IdentityPoolId: s3Config.IdentityPoolId,
  //   });

  //   AWS.config.credentials.get(function (err) {
  //     if (err) alert(err);
  //     // console.log(AWS.config.credentials);
  //   });
  //   var bucket = new AWS.S3({
  //     params: {
  //       Bucket: s3Config.bucketName,
  //     },
  //   });
  //   var objKey = sanitizedFileName;
  //   var params = {
  //     Key: objKey,
  //     ContentType: file.type,
  //     Body: file,
  //     ACL: "public-read",
  //   };
  //   bucket.upload(params, function (err, data) {
  //     if (err) {
  //       results.innerHTML = "ERROR: " + err;
  //     } else {
  //       bucket.listObjects(function (err, data) {
  //         if (err) {
  //           showNotification({
  //             title: "Upload Failed",
  //             message: "Something went Wrong",
  //             color: "red.0",
  //           });
  //         } else {
  //           let link = "https://testing-buck-22.s3.amazonaws.com/" + objKey;
  //           type === "public"
  //           ? setReportFiles({
  //             ...reportFiles,
  //             reportFile: link,
  //           })
  //           : setPrivateReportFiles({
  //             ...privatereportFiles,
  //             reportFile: link,
  //           });
  //           setFileLoader(false);
  //         }
  //       });
  //     }
  //     setPrivateReportCheck(false);
  //   });
  // };

 

 
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
          <Tabs.Tab value="public">{translate("Upload Public Report")}</Tabs.Tab>
          <Tabs.Tab value="private">{translate("Upload Private Report")}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="public" pt="xs">
          <Text fz={20} fw="bolder" align="center" mb={"md"}>
            {translate("Upload Public Report")}
          </Text>
          <InputField
            label={"Title"}
            placeholder="Title"
            pb="0"
            mb={"md"}
            onChange={(e) =>
              setReportFiles({
                ...reportFiles,
                reportTitle: e.target.value,
              })
            }
          />

          <TextEditor editor={editorr} minHeight="200px" />
        </Tabs.Panel>

        <Tabs.Panel value="private" pt="xs">
          <Text fz={20} fw="bolder" align="center" mb={"md"}>
            {translate("Private Report")}
          </Text>

          <InputField
            label={"Title"}
            placeholder="Title"
            pb="0"
            mb={"md"}
            onChange={(e) =>
              setPrivateReportFiles({
                ...privatereportFiles,
                reportTitle: e.target.value,
              })
            }
          />
          <TextEditor editor={editorr2} minHeight="200px" />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default DoubleTabs;
