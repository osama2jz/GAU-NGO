import React, { useState } from "react";
import { useStyles } from "../styles";
import {
  Tabs,
  SimpleGrid,
  Anchor,
  Grid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import TextArea from "../../../../Components/TextArea";
import { Dropzone } from "@mantine/dropzone";
import Button from "../../../../Components/Button/index";
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
            <Grid.Col md={4} xs={5}>
              <SimpleGrid cols={2}>
                <UserInfo userData={selectedUser} />
              </SimpleGrid>
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
              <Dropzone
                // accept={MIME_TYPES.pdf}
                onDrop={(v) => {
                  setFiles(v);
                  setDocument((document) => ({
                    ...document,
                    document: v,
                  }));
                }}
              >
                <Button
                  leftIcon={"upload2"}
                  label={"Upload Document"}
                  primary={true}
                />
              </Dropzone>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="private" pt="xs">
          <Text fz={20} fw="bolder" align="center" mb={"md"}>
            Upload Private Report
          </Text>
          <Grid mt={30} justify="space-between">
            <Grid.Col md={4} xs={5}>
              <SimpleGrid cols={2}>
                <UserInfo userData={selectedUser} />
              </SimpleGrid>
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

              <Dropzone
                // accept={MIME_TYPES.pdf}
                onDrop={(v) => {
                  setFiles2(v);
                  setDocument((document) => ({
                    ...document,
                    document: v,
                  }));
                }}
              >
                <Button
                  label={"Upload Document"}
                  leftIcon="upload2"
                  primary={true}
                />
              </Dropzone>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
     
    </>
  );
};

export default DoubleTabs;
