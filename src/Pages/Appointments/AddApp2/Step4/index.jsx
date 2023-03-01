import React, { useContext, useState } from "react";
import { Container, Text, Grid } from "@mantine/core";
import Cards from "../../../../Components/ProfessionCard";
import InputField from "../../../../Components/InputField";
import SelectMenu from "../../../../Components/SelectMenu";
import ReferModal from "../../../../Components/ProfessionCard/ReferModal";
import { useQuery } from "react-query";
import axios from "axios";
import { backendUrl } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
const Step4 = ({caseId,slot,setSlot}) => {

  const { user } = useContext(UserContext);
  const [cardData, setCardData]=useState()
  const [referCase, setNewReferCase] = useState();
  const [referedTo, setReferedTo] = useState("");

  
  const { data: users, status } = useQuery(
    "referSchedule",
    () => {
      return axios.get(
        backendUrl + `/api/schedule/listNGOUsersSchedule`,
        {
          headers: {
            "x-access-token": user?.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
          let card = {
            userId:obj?.userId,
            name: obj?.fullName,
            role: obj?.role,
            branches: obj?.branches.map((e) => ({
              label: e.branchName,
              value: e.branchId,
            })),
            schedule: obj?.schedule
          };
          return card;
        });
          setCardData(data)
      },
    }
  );


  return (
    <>
      <Container size="lg">
        <Text fz={32} fw="bolder" align="center" mb={"md"}>
          Refer to Experts
        </Text>
        <Grid align={"center"} py="md">
          <Grid.Col md={6}>
            <InputField placeholder="Search" leftIcon="search" pb="0" />
          </Grid.Col>
          <Grid.Col md={6}>
            <SelectMenu
              placeholder="Select by Type"
              data={[
                { label: "Lawyer", value: "lawyer" },
                { label: "Psychologist", value: "psychologistng" },
                { label: "Social Worker", value: "socailworker" },
              ]}
            />
          </Grid.Col>
        </Grid>
        <Grid>
          {cardData?.map((e,index) => (
            e.schedule?.length > 0 && <Grid.Col md={6} lg={4} xl={3}>
              <Cards cardData={e} referCase={referCase} setNewReferCase={setNewReferCase} caseId={caseId} slot={slot} setSlot={setSlot} 
              referedTo={referedTo} setReferedTo={setReferedTo}/>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Step4;
