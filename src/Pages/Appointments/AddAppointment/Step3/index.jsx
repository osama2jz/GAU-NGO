import React, { useState } from "react";
import { Tabs, SimpleGrid, Anchor, Checkbox, Container, Flex, Grid, Text, useMantineTheme } from "@mantine/core";
import { useStyles } from "../styles";
import TextArea from "../../../../Components/TextArea";
import { Dropzone } from "@mantine/dropzone";
import Button from "../../../../Components/Button/index";
const Step3 = () => {
 const { classes } = useStyles();
 const theme =useMantineTheme()
 const [files, setFiles] = useState([]);
 const [document, setDocument] = useState();
 console.log(document, files);
 const texts = [
  "Full Name",
  "Passport",
  "Date of Birth",
  "Nationality",
  "Origin",
  "Age",
  "Domicile",
  "Municipality",
 ].map((e, i) => {
  return (
   <>
    <Text fz={20} fw={"bold"}>
     {e}
    </Text>
    <Text opacity={"40%"} fz={20} fw={"bold"}>
     {e}
    </Text>
   </>
  );
 });
 return (
  <Container size="lg">
   <Text fz={20} fw="bolder" align="center" mb={"md"}>
    Upload Report
   </Text>
   <Flex justify={"space-between"}>
    <SimpleGrid cols={2}>
     <Text fz={18} fw={"bold"}>
      Case#
     </Text>
     <Text>XXXX</Text>
     <Text fz={18} fw={"bold"}>
      Report#
     </Text>
     <Text>XXXX</Text>
    </SimpleGrid>
    <Flex align={"center"}>
     <Text fz={18} fw={"bold"}>
      Date:
     </Text>
     <Text ml={10}>XXXX</Text>
    </Flex>
   </Flex>
   {/* ///// */}
   <Tabs className={classes.tab} defaultValue="public" variant="pills" color={theme.colors.primary}>
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
       <TextArea rows="7" label="Add Comments" placeholder={"Enter Comments"} />
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
        // style={{ width: "220px" }}
       >
        <Button label={"Upload Report"} leftIcon="upload2"/>
       </Dropzone>
       <TextArea label="Add Comments" placeholder={"Enter Comments"} />
      </Grid.Col>
     </Grid>
    </Tabs.Panel>
   </Tabs>
  </Container>
 );
};

export default Step3;
