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
import { texts } from "../userInformation";

const DoubleTabs = () => {
  const [files, setFiles] = useState([]);
  const [document, setDocument] = useState();
  const { classes } = useStyles();
  return (
    <>
      <Tabs
        className={classes.tab}
        defaultValue="public"
        variant="pills"
        color={"blue"}
      >
        <Tabs.List>
          <Tabs.Tab value="public">Upload Public Report</Tabs.Tab>
          <Tabs.Tab value="private">Upload Private Report</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="public" pt="xs">
          <Text fz={20} fw="bolder" align="center" mb={"md"}>
            Upload Public Report
          </Text>
          <Grid mt={30} justify="space-between">
            <Grid.Col md={4} xs={5}>
              <SimpleGrid cols={2}>{texts}</SimpleGrid>
            </Grid.Col>
            <Grid.Col md={6}>
              {files.length > 0 && <Anchor>{files[0]?.name}</Anchor>}
              <Dropzone
                // accept={MIME_TYPES.pdf}
                multiple={false}
                maxFiles={1}
                onDrop={(v) => {
                  setFiles(v);
                  setDocument((document) => ({
                    ...document,
                    document: v[0],
                  }));
                }}
              >
                <Button leftIcon={"upload2"} label={"Upload Report"} />
                {/* <Text align="center">Upload PDF</Text> */}
              </Dropzone>
              <TextArea
                rows="7"
                label="Add Comments"
                placeholder={"Enter Comments"}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="private" pt="xs">
          <Text fz={20} fw="bolder" align="center" mb={"md"}>
            Upload Private Report
          </Text>
          <Grid mt={30} justify="space-between">
            <Grid.Col md={4} xs={5}>
              <SimpleGrid cols={2}>{texts}</SimpleGrid>
            </Grid.Col>
            <Grid.Col md={6}>
              {files.length > 0 && <Anchor>{files[0]?.name}</Anchor>}

              <Dropzone
                multiple={false}
                maxFiles={1}
                onDrop={(v) => {
                  setFiles(v);
                  setDocument((document) => ({
                    ...document,
                    document: v[0],
                  }));
                }}
              >
                <Button label={"Upload Report"} leftIcon="upload2" />
              </Dropzone>
              <TextArea label="Add Comments" placeholder={"Enter Comments"} />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default DoubleTabs;
