import React, { useContext, useState } from "react";
import {
  SimpleGrid,
  Container,
  Flex,
  Text,
  useMantineTheme,
  Divider,
} from "@mantine/core";
import { useStyles } from "../styles";
import DoubleTabs from "./Tabs";
import InputField from "../../../../Components/InputField";
import Button from "../../../../Components/Button";

import { Dropzone } from "@mantine/dropzone";
import { UserContext } from "../../../../contexts/UserContext";
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
  console.log("User", user)
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
          <Dropzone
          // accept={MIME_TYPES.pdf}
          onDrop={(v) => {
            
            otherDocument[index].documentURL=""
            setOtherDocument([...otherDocument])
          }}
          >
            <Button label={"Upload "} leftIcon="upload2" bg={true} />
          </Dropzone>
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
