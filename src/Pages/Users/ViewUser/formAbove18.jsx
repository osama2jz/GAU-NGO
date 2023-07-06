import {
  Card,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import Button from "../../../Components/Button";
import InputField from "../../../Components/InputField";
import TextArea from "../../../Components/TextArea";
import { useStyles } from "./styles";
import InputMask from "react-input-mask";
import Datepicker from "../../../Components/Datepicker";
import { UserContext } from "../../../contexts/UserContext";

export const AgeFormAbove = ({ data, compRef }) => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);

  console.log("data", data);

  useEffect(() => {
    if (data) {
      form.setValues(data);
      form.setFieldValue("over18StartDate", new Date(data?.over18StartDate));
    }
  }, [data]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      over18Number: "",
      over18Age: "",
      over18Sex: "",
      over18MaritalStatus: "",
      over18Profession: "",
      over18Studies: "",
      over18Address: "",
      over18Origin: "",
      over18Telephone: "",
      over18Couple: "",
      over18Children: "", //NationalID,ResidentialID,Passport
      over18Informant: "",
      over18PriorPsychologicalCare: "",

      over18ReasonForConsultation: "",

      //not confirmed
      over18StartDate: "",
      over18Duration: "",

      over18PrecipitatingFactors: "",
      over18ImpactOfProblem: "",
      over18Objective: "",

      over18PreviousDevelopment: "",
      over18Environment: "",
      over18Habits: "",

      //Studies and Occupation
      over18Antental: "",
      over18PreviousDevelopmentChildhood: "",
      over18StudiesEnvironment: "",
      over18StudiesHabits: "",
      over18StudiesProfessionalAspirations: "",
      over18StudiesPreviousWorks: "",

      //Mother
      over18MotherName: "",
      over18MotherProfession: "",
      over18MotherAge: "",

      //Father
      over18FatherName: "",
      over18FatherProfession: "",
      over18FatherAge: "",

      over18Siblings: "",

      over18CoupleName: "",
      over18CoupleProfession: "",
      over18CoupleAge: "",

      over18ChildrenName: "",
      over18ChildrenAge: "",

      over18MotherRelation: "",
      over18FatherRelation: "",
      over18BrotherRelation: "",
      over18PartnerRelation: "",
      over18ChildRelation: "",

      over18RelevantFamilyProblems: "",

      //Social Relations
      over18Frequency: "",
      over18Ease: "",
      over18Difficulties: "",
      over18CurrentDisturbance: "",
      over18AnyOneHelp: "",

      //Interests and motivations
      over18TakesMostTime: "",
      over18HowFun: "",
      over18ComfortableSituations: "",
      over18ImportantPerson: "",
      over18ImportantConcerns: "",
      over18ChangeThings: "",
      over18ExpectFromOthers: "",
      over18GreatestIllusion: "",

      //Sexuality
      over18CurrentRelationship: "",
      over18SpecificProblems: "",
      over18GenitalProblems: "",
      over18AreasofCompatibility: "",
      over18AreasofIncompatibility: "",
      over18CommunicationLevel: "",
      over18PreviousIntercourse: "",
      over18ExtraMaritalAffairs: "",

      //Obsessive Problems
      over18NotAbleToGetHead: "",
      over18AbsurdUnpleasant: "",
      over18FeelNervous: "",
      over18AvoidThoughts: "",
      over18TaskRepeat: "",

      //Organic and psychosomatic pathology
      over18MajorIllness: "",
      over18Diseases: "",
      over18Illness: "",
      over18PhysicalDiscomfort: "",
      over18RelevantMedication: "",
      over18PhysicalDescription: "",
      over18BehaviourObservation: "",
    },
    validate: {
      over18Number: (value) =>
        value.length < 1 ? translate("Please enter your Number") : null,
      over18Age: (value) =>
        value.length < 1 ? translate("Please enter your Age") : null,
      over18Sex: (value) =>
        value.length < 1 ? translate("Please enter sex") : null,
      over18MaritalStatus: (value) =>
        value.length < 1 ? translate("Please enter Marital Status") : null,
      over18Profession: (value) =>
        value.length < 1 ? translate("Please enter Profession") : null,
      over18Studies: (value) =>
        value.length < 1 ? translate("Please enter Studies") : null,
      over18Address: (value) =>
        value.length < 1 ? translate("Please enter Address") : null,
      over18Origin: (value) =>
        value.length < 1 ? translate("Please enter Country") : null,
      over18Telephone: (value) =>
        value.length < 1 ? translate("Please enter Telephone") : null,
      over18Couple: (value) =>
        value.length < 1 ? translate("Please enter Couple") : null,
      over18Children: (value) =>
        value.length < 1 ? translate("Please enter Children") : null,
      over18Informant: (value) =>
        value.length < 1 ? translate("Please enter Informant") : null,
    },
  });

  return (
    <Container size="lg" ref={compRef}>
      <Text fz={20} fw="bolder" align="center" mb={"xl"}>
        {translate("Psychology Form Over 18")}
      </Text>
      <form
        className={classes.form}
        onSubmit={form.onSubmit(() => {
          submit();
        })}
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Parentage Information")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 4 },
              { minWidth: "lg", cols: 3 },
              { minWidth: "xs", cols: 2 },
            ]}
          >
            <InputField
              label="Number"
              required={true}
              validateName="over18Number"
              component={InputMask}
              placeholder={"+34 -- ---- ---"}
              mask="+34 99 9999 999"
              form={form}
              readOnly={true}
            />
            <InputField
              label="Age"
              required={true}
              placeholder="Age"
              form={form}
              readOnly={true}
              validateName="over18Age"
            />
            <InputField
              label="Sex"
              required={true}
              placeholder="Sex"
              form={form}
              readOnly={true}
              validateName="over18Sex"
            />
            <InputField
              label="Marital status"
              required={true}
              placeholder="Marital status"
              form={form}
              readOnly={true}
              validateName="over18MaritalStatus"
            />
            <InputField
              label="Profession"
              required={true}
              placeholder="Profession"
              form={form}
              readOnly={true}
              validateName="over18Profession"
            />
            <InputField
              label="Studies"
              required={true}
              placeholder="Studies"
              form={form}
              readOnly={true}
              validateName="over18Studies"
            />

            <InputField
              label="Address"
              required={true}
              placeholder="Address"
              form={form}
              readOnly={true}
              validateName="over18Address"
            />
            <InputField
              label="Country"
              required={true}
              placeholder="Country"
              form={form}
              readOnly={true}
              validateName="over18Origin"
            />
            <InputField
              label="Telephone"
              required={true}
              placeholder="Telephone"
              form={form}
              readOnly={true}
              validateName="over18Telephone"
            />
            <InputField
              label="Couple"
              required={true}
              placeholder="Couple"
              form={form}
              readOnly={true}
              validateName="over18Couple"
            />
            <InputField
              label="Children"
              required={true}
              placeholder="Children"
              form={form}
              readOnly={true}
              validateName="over18Children"
            />
            <InputField
              label="Informant"
              required={true}
              placeholder="Informant"
              form={form}
              readOnly={true}
              validateName="over18Informant"
            />
          </SimpleGrid>
          <TextArea
            placeholder={"Prior Psychological Care"}
            label="Prior Psychological Care"
            form={form}
            readOnly={true}
            validateName="over18PriorPsychologicalCare"
          />
        </Card>

        {/* Consultation Reason */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Reason for Consultation")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <TextArea
            placeholder="Reason for Consultation"
            form={form}
            readOnly={true}
            validateName="over18ReasonForConsultation"
          />
        </Card>

        {/* History of Current Problem */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("History of Current Problem")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <Datepicker
              label={"Start Date"}
              form={form}
              readOnly={true}
              validateName="over18StartDate"
            />
            <InputField
              label="Duration Of Problem"
              required={true}
              placeholder="Duration of Problem"
              form={form}
              readOnly={true}
              validateName="over18Duration"
            />
            <TextArea
              label="Precipitating Factors"
              required={true}
              placeholder="Precipitating Factors"
              form={form}
              readOnly={true}
              validateName="over18PrecipitatingFactors"
              rows={"2"}
            />
            <TextArea
              label="Impact of Problem on Subject And Family"
              required={true}
              placeholder="Impact of Problem"
              form={form}
              readOnly={true}
              validateName="over18ImpactOfProblem"
              rows={"2"}
            />
            <TextArea
              label="Objective In Terms Of The Problem"
              required={true}
              placeholder="Objectives"
              form={form}
              readOnly={true}
              validateName="over18Objective"
              rows={"2"}
            />
          </SimpleGrid>
        </Card>

        {/* Psychological History */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Psychological History")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="Previous Development, Childhood and Adolescene"
              required={true}
              placeholder="Previous Development, Childhood and Adolescene"
              form={form}
              readOnly={true}
              validateName="over18PreviousDevelopment"
              rows={"2"}
            />
            <TextArea
              label="Environment (Housing, Religion)"
              required={true}
              placeholder="Environment"
              form={form}
              readOnly={true}
              validateName="over18Environment"
              rows={"2"}
            />
            <TextArea
              label="Habits"
              required={true}
              placeholder="Hygeine, Sleep, Food, Exercise"
              form={form}
              readOnly={true}
              validateName="over18Habits"
              rows={"2"}
            />
          </SimpleGrid>
        </Card>

        {/* Studies and Occupation */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Studies and Occupation")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="Antenatal,Conception,Pregnancy and childbirth "
              required={true}
              placeholder="Antenatal,Conception,Pregnancy and childbirth "
              form={form}
              readOnly={true}
              validateName="over18Antental"
              rows={"2"}
            />

            <TextArea
              label="Previous Development, Childhood and Adolescene"
              required={true}
              placeholder="Previous Development, Childhood and Adolescene"
              form={form}
              readOnly={true}
              validateName="over18PreviousDevelopmentChildhood"
              rows={"2"}
            />

            <TextArea
              label="Environement (Housing, Religion)"
              required={true}
              placeholder="Environement (Housing, Religion)"
              form={form}
              readOnly={true}
              validateName="over18StudiesEnvironment"
              rows={"2"}
            />
            <TextArea
              label="Habits"
              required={true}
              placeholder="Habits"
              form={form}
              readOnly={true}
              validateName="over18StudiesHabits"
              rows={"2"}
            />
            <TextArea
              label=" Professional and Social Aspirations"
              required={true}
              placeholder=" Professional and Social Aspirations"
              form={form}
              readOnly={true}
              validateName="over18StudiesProfessionalAspirations"
              rows={"2"}
            />
            <TextArea
              label="Previous Work"
              required={true}
              placeholder=" Previous Work"
              form={form}
              readOnly={true}
              validateName="over18StudiesPreviousWorks"
              rows={"2"}
            />
          </SimpleGrid>
        </Card>

        {/** Family Relation */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Family Relations")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />

          {/** Mother Relation */}
          <Card mt="sm">
            <Text className={classes.subHeading}>
              {translate("Mother’s Details")}
            </Text>
            <Divider color="#C8C8C8" mt="md" mb="md" />
            <SimpleGrid
              breakpoints={[
                { minWidth: "md", cols: 3 },
                { minWidth: "lg", cols: 3 },
                { minWidth: "xs", cols: 2 },
              ]}
            >
              <InputField
                label="Name"
                required={true}
                placeholder="Name"
                form={form}
                readOnly={true}
                validateName="over18MotherName"
              />
              <InputField
                label="Profession"
                required={true}
                placeholder="Profession"
                form={form}
                readOnly={true}
                validateName="over18MotherProfession"
              />
              <InputField
                label="Age"
                required={true}
                placeholder="Age"
                form={form}
                readOnly={true}
                validateName="over18MotherAge"
              />
            </SimpleGrid>
          </Card>

          {/** Father Relation */}
          <Card mt="sm">
            <Text className={classes.subHeading}>
              {translate("Father Details")}
            </Text>
            <Divider color="#C8C8C8" mt="md" mb="md" />
            <SimpleGrid
              breakpoints={[
                { minWidth: "md", cols: 3 },
                { minWidth: "lg", cols: 3 },
                { minWidth: "xs", cols: 2 },
              ]}
            >
              <InputField
                label="Name"
                required={true}
                placeholder="Name"
                form={form}
                readOnly={true}
                validateName="over18FatherName"
              />
              <InputField
                label="Profession"
                required={true}
                placeholder="Profession"
                form={form}
                readOnly={true}
                validateName="over18FatherProfession"
              />
              <InputField
                label="Age"
                required={true}
                placeholder="Age"
                form={form}
                readOnly={true}
                validateName="over18FatherAge"
              />
            </SimpleGrid>
          </Card>
          {/** Siblings */}
          <Card mt="sm">
            <TextArea
              placeholder="Siblings"
              label={"Siblings"}
              rows="1"
              form={form}
              readOnly={true}
              validateName="over18Siblings"
            />
          </Card>

          {/** Couple Relation */}
          <Card mt="sm">
            <Text className={classes.subHeading}>
              {translate("Couple Details")}
            </Text>
            <Divider color="#C8C8C8" mt="md" mb="md" />
            <SimpleGrid
              breakpoints={[
                { minWidth: "md", cols: 3 },
                { minWidth: "lg", cols: 3 },
                { minWidth: "xs", cols: 2 },
              ]}
            >
              <InputField
                label="Name"
                required={true}
                placeholder="Name"
                form={form}
                readOnly={true}
                validateName="over18CoupleName"
              />
              <InputField
                label="Profession"
                required={true}
                placeholder="Profession"
                form={form}
                readOnly={true}
                validateName="over18CoupleProfession"
              />
              <InputField
                label="Age"
                required={true}
                placeholder="Age"
                form={form}
                readOnly={true}
                validateName="over18CoupleAge"
              />
            </SimpleGrid>
          </Card>

          {/** Children Relation */}
          <Card mt="sm">
            <Text className={classes.subHeading}>
              {translate("Children Details")}
            </Text>
            <Divider color="#C8C8C8" mt="md" mb="md" />
            <SimpleGrid
              breakpoints={[
                { minWidth: "md", cols: 3 },
                { minWidth: "lg", cols: 3 },
                { minWidth: "xs", cols: 2 },
              ]}
            >
              <InputField
                label="Name"
                required={true}
                placeholder="Name"
                form={form}
                readOnly={true}
                validateName="over18ChildrenName"
              />
              <InputField
                label="Age"
                required={true}
                placeholder="Age"
                form={form}
                readOnly={true}
                validateName="over18ChildrenAge"
              />
            </SimpleGrid>
          </Card>

          {/** Relation Relation */}
          <Card mt="sm">
            <Text className={classes.subHeading}>{translate("Relation")}</Text>
            <Divider color="#C8C8C8" mt="md" mb="md" />
            <SimpleGrid
              breakpoints={[
                { minWidth: "md", cols: 3 },
                { minWidth: "lg", cols: 3 },
                { minWidth: "xs", cols: 2 },
              ]}
            >
              <InputField
                label="Mother"
                required={true}
                placeholder="Mother"
                form={form}
                readOnly={true}
                validateName="over18MotherRelation"
              />{" "}
              <InputField
                label="Father"
                required={true}
                placeholder="Father"
                form={form}
                readOnly={true}
                validateName="over18FatherRelation"
              />{" "}
              <InputField
                label="Brothers"
                required={true}
                placeholder="Brothers"
                form={form}
                readOnly={true}
                validateName="over18BrotherRelation"
              />
              <InputField
                label="Partner"
                required={true}
                placeholder="Partner"
                form={form}
                readOnly={true}
                validateName="over18PartnerRelation"
              />
              <InputField
                label="Childs"
                required={true}
                placeholder="Childs"
                form={form}
                readOnly={true}
                validateName="over18ChildRelation"
              />
            </SimpleGrid>
          </Card>
          <Card mt="sm">
            <TextArea
              placeholder="Relevant Family Problems"
              label={"Relevant Family Problems"}
              rows="2"
              form={form}
              readOnly={true}
              validateName="over18RelevantFamilyProblems"
            />
          </Card>
        </Card>

        {/* Social Relations */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Social Relations")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="Frequency of social contacts"
              required={true}
              placeholder="Frequency of social contacts"
              form={form}
              readOnly={true}
              validateName="over18Frequency"
              rows={"2"}
            />
            <TextArea
              label="Ease of establishing new relationships and preserving them"
              required={true}
              placeholder="Ease of establishing new relationships "
              form={form}
              readOnly={true}
              validateName="over18Ease"
              rows={"2"}
            />
            <TextArea
              label="Difficulties in Social Relationsships"
              required={true}
              placeholder="Difficulties in Social Relationsships"
              form={form}
              readOnly={true}
              validateName="over18Difficulties"
              rows={"2"}
            />
            <TextArea
              label="Does anyone currently disturb you?"
              required={true}
              placeholder="Does anyone currently disturb you?"
              form={form}
              readOnly={true}
              validateName="over18CurrentDisturbance"
              rows={"2"}
            />
            <TextArea
              label="Does anyone help you or would help you?"
              required={true}
              placeholder="Does anyone help you or would help you?"
              form={form}
              readOnly={true}
              validateName="over18AnyOneHelp"
              rows={"2"}
            />
          </SimpleGrid>
        </Card>

        {/* Interests and motivations */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Interests and Motivations")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="What it takes up most of the time?"
              required={true}
              placeholder="answer"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18TakesMostTime"
            />
            <TextArea
              label="How he/she likes to have fun?"
              required={true}
              placeholder="answer"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18HowFun"
            />
            <TextArea
              label="Where is he/she most comfortable?"
              required={true}
              placeholder="answer"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18ComfortableSituations"
            />
            <TextArea
              label="Which person is the most important in his/her life?"
              required={true}
              placeholder="answer"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18ImportantPerson"
            />
            <TextArea
              label="What is his/her most important concerns?"
              required={true}
              placeholder="answer"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18ImportantConcerns"
            />
            <TextArea
              label="What things he/she wishes to change in his/her life?"
              required={true}
              placeholder="answer"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18ChangeThings"
            />
            <TextArea
              label="What does he/she expect from others?"
              required={true}
              placeholder="answer"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18ExpectFromOthers"
            />
            <TextArea
              label="What is his/her greatest illusions?"
              required={true}
              placeholder="answer"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18GreatestIllusion"
            />
          </SimpleGrid>
        </Card>

        {/* Sexuality */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Sexuality and couple")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="Current relationships is Satisfactory or not"
              required={true}
              placeholder="Current relationships is Satisfactory or not"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18CurrentRelationship"
            />
            <TextArea
              label="Problems specific to this area"
              required={true}
              placeholder="Problems specific to this area"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18SpecificProblems"
            />
            <TextArea
              label="Menstrual or genital problems"
              required={true}
              placeholder="Menstrual or genital problems"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18GenitalProblems"
            />
            <TextArea
              label="Areas of compatibility with the couple"
              required={true}
              placeholder="Areas of compatibility with the couple"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18AreasofCompatibility"
            />
            <TextArea
              label="Areas of incompatibility"
              required={true}
              placeholder="Areas of incompatibility"
              form={form}
              readOnly={true}
              validateName="over18AreasofIncompatibility"
              rows={"2"}
            />
            <TextArea
              label="Level of communication"
              required={true}
              placeholder="Level of communication"
              form={form}
              readOnly={true}
              validateName="over18CommunicationLevel"
              rows={"2"}
            />
            <TextArea
              label="Previous sexual intercourse"
              required={true}
              placeholder="Previous sexual intercourse"
              form={form}
              readOnly={true}
              validateName="over18PreviousIntercourse"
              rows={"2"}
            />
            <TextArea
              label="Extramarital affairs"
              required={true}
              placeholder="Extramarital affairs"
              form={form}
              readOnly={true}
              validateName="over18ExtraMaritalAffairs"
              rows={"2"}
            />
          </SimpleGrid>
        </Card>

        {/* Obsessive Problems */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Obsessive Problems")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="Do you have ideas that you are not able to get out of head?"
              required={true}
              placeholder="Do you have ideas that you are not able to get out of head?"
              form={form}
              readOnly={true}
              validateName="over18NotAbleToGetHead"
              rows={"2"}
            />
            <TextArea
              label="Are you presented with absurd or unpleasant ideas?"
              required={true}
              placeholder="Are you presented with absurd or unpleasant ideas?"
              form={form}
              readOnly={true}
              validateName="over18AbsurdUnpleasant"
              rows={"2"}
            />
            <TextArea
              label="Are there things you are forced to do, or you feel nervous?"
              required={true}
              placeholder="Are there things you are forced to do, or you feel nervous?"
              form={form}
              readOnly={true}
              validateName="over18FeelNervous"
              rows={"2"}
            />
            <TextArea
              label="Are there thoughts you try to avoid at all costs?"
              required={true}
              placeholder="Are there thoughts you try to avoid at all costs?"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18AvoidThoughts"
            />
            <TextArea
              label="Do you repeat a task or idea numerous times to make sure it's okay?"
              required={true}
              placeholder="Do you repeat a task or idea numerous times to make sure it's okay?"
              form={form}
              readOnly={true}
              rows={"2"}
              validateName="over18TaskRepeat"
            />
          </SimpleGrid>
        </Card>

        {/* Organic and psychosomatic pathology */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Organic and psychosomatic pathology")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="Major illnesses suffered"
              required={true}
              placeholder="Major illnesses suffered"
              form={form}
              readOnly={true}
              validateName="over18MajorIllness"
            />
            <TextArea
              label="Diseases you currently suffer from"
              required={true}
              placeholder="Diseases you currently suffer from"
              form={form}
              readOnly={true}
              validateName="over18Diseases"
            />
            <TextArea
              label="Illnesses in other family members"
              required={true}
              placeholder="Illnesses in other family members"
              form={form}
              readOnly={true}
              validateName="over18Illness"
            />
            <TextArea
              label="Do you currently feel any physical discomfort?"
              required={true}
              placeholder="Do you currently feel any physical discomfort?"
              form={form}
              readOnly={true}
              validateName="over18PhysicalDiscomfort"
            />
            <TextArea
              label="Relevant medication"
              required={true}
              placeholder="Relevant medication"
              form={form}
              readOnly={true}
              validateName="over18RelevantMedication"
            />
          </SimpleGrid>
        </Card>

        {/* Remarks */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>{translate("Remarks")}</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="Physical description"
              required={true}
              placeholder="Physical description"
              form={form}
              readOnly={true}
              validateName="over18PhysicalDescription"
            />
            <TextArea
              label="Behavior observation"
              required={true}
              placeholder="Behavior observation"
              form={form}
              readOnly={true}
              validateName="over18BehaviourObservation"
            />
          </SimpleGrid>
        </Card>
      </form>
    </Container>
  );
};
