import {
  Card,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import InputField from "../../../Components/InputField";
import TextArea from "../../../Components/TextArea";
import { useStyles } from "./styles";
import InputMask from "react-input-mask";
import Datepicker from "../../../Components/Datepicker";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const AgeForm = ({ data, compRef }) => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);

  useEffect(() => {
    if (data) {
      form.setValues(data);
      form.setFieldValue("under18StartDate", new Date(data?.under18StartDate));
    }
  }, [data]);

  console.log("Data", data);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      //Parentage Information
      under18Number: "",
      under18Age: "",
      under18Sex: "",
      under18SchoolCourse: "",
      under18LiveWith: "",
      under18Informant: "",
      under18PriorPsychologicalCare: "",

      //Parental Details
      under18ParentalNumber: "",
      under18ParentalAge: "",
      under18ParentalProfession: "",
      under18ParentalDisease: "",

      //Siblings Details
      under18SiblingsNumber: "",
      under18SiblingsAge: "",
      under18SiblingsProfession: "",
      under18SiblingsDisease: "",

      //Consultation Reason
      under18ReasonForConsultation: "",

      //History of Current Problem
      under18StartDate: "",
      under18Duration: "",
      under18PrecipitatingFactors: "",
      under18ImpactOfProblem: "",
      under18Objective: "",

      // Psychological History
      //Backend
      under18Antental: "",
      under18PreviousDevelopment: "",
      under18Environment: "",
      under18Habits: "",

      // Studies and Occupation
      under18EducationLevel: "",
      under18RelationClassMates: "",
      under18RelationshipTeachers: "",
      under18SchoolProblems: "",
      under18CareerAspirations: "",
      under18ExtraCiricularActivities: "",
      under18AttitudeExams: "",
      under18ParentsAttitude: "",

      // Family Relations
      under18MotherName: "",
      under18FatherName: "",
      under18Siblings: "",
      under18DependencyLevel: "",
      under18RelevantFamilyProblems: "",
      under18TimeDedicated: "",
      under18RelationshipBetweenParents: "",
      under18ImportantEvents: "",
      under18ApplicationOfReward: "",

      // Social Relations
      under18Friends: "",
      under18Interact: "",
      under18Difficulties: "",

      //Interests and Motivations
      under18TakesMostTime: "",
      under18HowFun: "",
      under18ComfortableSituations: "",
      under18ImportantPerson: "",
      under18ImportantConcerns: "",
      under18ChangeThings: "",
      //Backend
      under18ExpectFromOthers: "",
      under18GreatestIllusion: "",

      //Sexuality
      under18SexualGames: "",
      under18SexualCurosity: "",
      under18LevelOfSexEducation: "",
      under18SexualDevelopment: "",

      //Obsessive Problems
      under18NotAbleToGetHead: "",
      under18AbsurdUnpleasant: "",
      under18FeelNervous: "",
      under18AvoidThoughts: "",
      under18TaskRepeat: "",

      // under18MajorIllness: "",
      // under18Diseases: "",
      // under18Illness: "",
      // under18PhysicalDiscomfort: "",
      // under18RelevantMedication: "",
      under18PhysicalDescription: "",
      under18BehaviourObservation: "",
    },
    validate: {
      under18Number: (value) =>
        value.length < 1 ? translate("Please enter your Number") : null,
      under18Age: (value) =>
        value.length < 1 ? translate("Please enter your Age") : null,

      under18Sex: (value) =>
        value.length < 1 ? translate("Please enter sex") : null,
      under18SchoolCourse: (value) =>
        value.length < 1 ? translate("Please enter School course") : null,
      under18LiveWith: (value) =>
        value.length < 1 ? translate("Please enter Live With") : null,
      under18Informant: (value) =>
        value.length < 1 ? translate("Please enter Informant") : null,
    },
  });
  return (
    <Container size="lg" ref={compRef}>
      <Text fz={20} fw="bolder" align="center" mb={"xl"}>
        {translate("Psychology Form Under 18")}
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
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 3 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <InputField
              label="Number"
              required={true}
              placeholder="+34 -- ---- ---"
              component={InputMask}
              mask="+34 9999 999"
              form={form}
              readOnly={true}
              validateName="under18Number"
            />
            <InputField
              label="Age"
              required={true}
              placeholder="Age"
              form={form}
              readOnly={true}
              validateName="under18Age"
            />
            <InputField
              label="Sex"
              required={true}
              placeholder="Sex"
              form={form}
              readOnly={true}
              validateName="under18Sex"
            />
            <InputField
              label="School and Course"
              required={true}
              placeholder="School and Course"
              form={form}
              readOnly={true}
              validateName="under18SchoolCourse"
            />

            <InputField
              label="Lives With"
              required={true}
              placeholder="Lives with"
              form={form}
              readOnly={true}
              validateName="under18LiveWith"
            />

            <InputField
              label="Informant"
              required={true}
              placeholder="Informant"
              form={form}
              readOnly={true}
              validateName="under18Informant"
            />
          </SimpleGrid>
          <TextArea
            placeholder={"Prior Psychological Care"}
            label="Prior Psychological Care"
            form={form}
            readOnly={true}
            validateName="under18PriorPsychologicalCare"
          />
        </Card>

        {/** Parental Details */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Parental Details")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 4 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <InputField
              label="Number"
              required={true}
              placeholder="+34 -- ---- ---"
              component={InputMask}
              mask="+34 99 9999 999"
              form={form}
              readOnly={true}
              validateName="under18ParentalNumber"
            />
            <InputField
              label="Age"
              required={true}
              placeholder="Age"
              form={form}
              readOnly={true}
              validateName="under18ParentalAge"
            />
            <InputField
              label="Profession"
              required={true}
              placeholder="Profession"
              form={form}
              readOnly={true}
              validateName="under18ParentalProfession"
            />
            <InputField
              label="Diseases"
              required={true}
              placeholder="Diseases"
              form={form}
              readOnly={true}
              validateName="under18ParentalDisease"
            />
          </SimpleGrid>
        </Card>

        {/* Mother's Details */}
        {/* <Card mt="sm">
          <Text className={classes.subHeading}>
            {translate("Mother’s Details")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 4 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <InputField
              label="Number"
              required={true}
              placeholder="+34 -- ---- ---"
              component={InputMask}
              mask="+34 99 9999 999"
              form={form}
              readOnly={true}
              validateName="number2"
            />
            <InputField
              label="Age"
              required={true}
              placeholder="Age"
              form={form}
              readOnly={true}
              validateName="age2"
            />
            <InputField
              label="Profession"
              required={true}
              placeholder="Profession"
              form={form}
              readOnly={true}
              validateName="profession"
            />
            <InputField
              label="Diseases"
              required={true}
              placeholder="Diseases"
              form={form}
              readOnly={true}
              validateName="diseases"
            />
          </SimpleGrid>
        </Card> */}

        {/* Siblings Details */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Siblings Details")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 4 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <InputField
              label="Number"
              required={true}
              placeholder="+34 -- ---- ---"
              component={InputMask}
              mask="+34 99 9999 999"
              form={form}
              readOnly={true}
              validateName="under18SiblingsNumber"
            />
            <InputField
              label="Age"
              required={true}
              placeholder="Age"
              form={form}
              readOnly={true}
              validateName="under18SiblingsAge"
            />
            <InputField
              label="Profession"
              required={true}
              placeholder="Profession"
              form={form}
              readOnly={true}
              validateName="under18SiblingsProfession"
            />
            <InputField
              label="Diseases"
              required={true}
              placeholder="Diseases"
              form={form}
              readOnly={true}
              validateName="under18SiblingsDisease"
            />
          </SimpleGrid>
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
            validateName="under18ReasonForConsultation"
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
              label={"Start Date Of Problem"}
              form={form}
              readOnly={true}
              validateName="under18StartDate"
            />
            <InputField
              label="Duration Of Problem"
              required={true}
              placeholder="duration"
              form={form}
              readOnly={true}
              validateName="under18Duration"
            />
            <TextArea
              label="Precipitating Factors"
              required={true}
              placeholder="Precipitating Factors"
              form={form}
              readOnly={true}
              validateName="under18PrecipitatingFactors"
            />
            <TextArea
              label="Impact of Problem on Subject And Family"
              required={true}
              placeholder="Impact of Problem"
              form={form}
              readOnly={true}
              validateName="under18ImpactOfProblem"
            />
            <TextArea
              label="Objective In Terms Of The Problem"
              required={true}
              placeholder="Objective"
              form={form}
              readOnly={true}
              validateName="under18Objective"
            />
          </SimpleGrid>
        </Card>

        {/* Psychological History */}
        <Card mt="sm">
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
              label="Antenatal, Conception, Pregnancy And Childbirth"
              required={true}
              placeholder="Antenatal, Conception, Pregnancy And Childbirth"
              form={form}
              readOnly={true}
              validateName="under18Antental"
            />
            <TextArea
              label="Previous Development, Childhood and Adolescene"
              required={true}
              placeholder="Previous Development, Childhood and Adolescene"
              form={form}
              readOnly={true}
              validateName="under18PreviousDevelopment"
            />
            <TextArea
              label="Environment (Housing, Religion)"
              required={true}
              placeholder="Environment"
              form={form}
              readOnly={true}
              validateName="under18Environment"
            />
            <TextArea
              label="Habits"
              required={true}
              placeholder="Hygeine, Sleep, Food, Exercise"
              form={form}
              readOnly={true}
              validateName="under18Habits"
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
              label="Education Level"
              required={true}
              placeholder="Education Level"
              form={form}
              readOnly={true}
              validateName="under18EducationLevel"
            />
            <TextArea
              label="Relationship with Classmates"
              required={true}
              placeholder="Relationship with Classmates"
              form={form}
              readOnly={true}
              validateName="under18RelationClassMates"
            />
            <TextArea
              label="Relationship with Teachers"
              required={true}
              placeholder="Relationship with Teachers"
              form={form}
              readOnly={true}
              validateName="under18RelationshipTeachers"
            />
            <TextArea
              label="School Problems, Learning Difficulties"
              required={true}
              placeholder="School Problems, Learning Difficulties"
              form={form}
              readOnly={true}
              validateName="under18SchoolProblems"
            />
            <TextArea
              label="Career Aspiration"
              required={true}
              placeholder="Career Aspiration"
              form={form}
              readOnly={true}
              validateName="under18CareerAspirations"
            />
            <TextArea
              label="Extra Curricular Activities"
              required={true}
              placeholder="Extra Curricular Activities"
              form={form}
              readOnly={true}
              validateName="under18ExtraCiricularActivities"
            />
            <TextArea
              label="Attitude Towards Studies and Exams"
              required={true}
              placeholder="Attitude Towards Studies and Exams"
              form={form}
              readOnly={true}
              validateName="under18AttitudeExams"
            />
            <TextArea
              label="Parents Attitude Towards School Performance"
              required={true}
              placeholder="Parents Attitude Towards School Performance"
              form={form}
              readOnly={true}
              validateName="under18ParentsAttitude"
            />
          </SimpleGrid>
        </Card>

        {/* Family Relations */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            {translate("Family Relations")}
          </Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 3 },
              { minWidth: "xs", cols: 2 },
            ]}
            mb={"lg"}
          >
            <InputField
              label="Mother"
              required={true}
              placeholder="Mother"
              form={form}
              readOnly={true}
              validateName="under18MotherName"
            />
            <InputField
              label="Father"
              required={true}
              placeholder="Father"
              form={form}
              readOnly={true}
              validateName="under18FatherName"
            />
            <InputField
              label="Siblings"
              required={true}
              placeholder="Siblings"
              form={form}
              readOnly={true}
              validateName="under18Siblings"
            />
          </SimpleGrid>
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="Level of Dependency"
              required={true}
              placeholder="Level of Dependency"
              form={form}
              readOnly={true}
              validateName="under18DependencyLevel"
            />
            <TextArea
              label="Relevant Family Problems"
              required={true}
              placeholder="Relevant Family Problems"
              form={form}
              readOnly={true}
              validateName="under18RelevantFamilyProblems"
            />
            <TextArea
              label="Time Dedicated by Parents to Family Coexistance"
              required={true}
              placeholder="Time Dedicated by Parents to Family Coexistance"
              form={form}
              readOnly={true}
              validateName="under18TimeDedicated"
            />
            <TextArea
              label="Relationship Between Parents"
              required={true}
              placeholder="Relationship Between Parents"
              form={form}
              readOnly={true}
              validateName="under18RelationshipBetweenParents"
            />

            <TextArea
              label="Important Events"
              required={true}
              placeholder="eg. Trips, Death"
              form={form}
              readOnly={true}
              validateName="under18ImportantEvents"
            />
            <TextArea
              label="Application of Rewards and Punishment"
              required={true}
              placeholder="Application of Rewards and Punishment"
              form={form}
              readOnly={true}
              validateName="under18ApplicationOfReward"
            />
          </SimpleGrid>
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
              label="Friends"
              required={true}
              placeholder="Friends"
              form={form}
              readOnly={true}
              validateName="under18Friends"
            />
            <TextArea
              label="Ability to Interact. Ease of Establishing New Relationships"
              required={true}
              placeholder="Ability to Interact"
              form={form}
              readOnly={true}
              validateName="under18Interact"
            />
            <TextArea
              label="Difficulties in Social Relationsships"
              required={true}
              placeholder="Difficulties in Social Relationsships"
              form={form}
              readOnly={true}
              validateName="under18Difficulties"
            />
          </SimpleGrid>
        </Card>

        {/* Interests and motivations */}
        <Card mt="sm">
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
              placeholder="Write here..."
              form={form}
              readOnly={true}
              validateName="under18TakesMostTime"
            />
            <TextArea
              label="How he/she likes to have fun?"
              required={true}
              placeholder="Write here..."
              form={form}
              readOnly={true}
              validateName="under18HowFun"
            />
            <TextArea
              label="Where is he/she most comfortable?"
              required={true}
              placeholder="Write here..."
              form={form}
              readOnly={true}
              validateName="under18ComfortableSituations"
            />
            <TextArea
              label="Which person is the most important in his/her life?"
              required={true}
              placeholder="Write Here..."
              form={form}
              readOnly={true}
              validateName="under18ImportantPerson"
            />
            <TextArea
              label="What is his/her most important concerns?"
              required={true}
              placeholder="Write Here..."
              form={form}
              readOnly={true}
              validateName="under18ImportantConcerns"
            />
            <TextArea
              label="What things he/she wishes to change in his/her life?"
              required={true}
              placeholder="Write Here..."
              form={form}
              readOnly={true}
              validateName="under18ChangeThings"
            />
            <TextArea
              label="What does he/she expect from others?"
              required={true}
              placeholder="Write Here..."
              form={form}
              readOnly={true}
              validateName="under18ExpectFromOthers"
            />
            <TextArea
              label="What is his/her greatest illusions?"
              required={true}
              placeholder="Write Here..."
              form={form}
              readOnly={true}
              validateName="under18GreatestIllusion"
            />
          </SimpleGrid>
        </Card>

        {/* Sexuality */}
        <Card mt="sm">
          <Text className={classes.subHeading}>{translate("Sexuality")}</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="Sexual games and investigations"
              required={true}
              placeholder="Sexual games and investigations"
              form={form}
              readOnly={true}
              validateName="under18SexualGames"
            />
            <TextArea
              label="Sexual curiosity in Childhood"
              required={true}
              placeholder="Sexual curiosity in Childhood"
              form={form}
              readOnly={true}
              validateName="under18SexualCurosity"
            />
            <TextArea
              label="Level of Sex Education by Parents"
              required={true}
              placeholder="Level of Sex Education by Parents"
              form={form}
              readOnly={true}
              validateName="under18LevelOfSexEducation"
            />
            <TextArea
              label="Sexual Development"
              required={true}
              placeholder="Sexual Development"
              form={form}
              readOnly={true}
              validateName="under18SexualDevelopment"
            />
          </SimpleGrid>
        </Card>

        {/* Obsessive Problems */}
        <Card mt="sm">
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
              label="Do you have ideas that you are not able to get out of your head?"
              required={true}
              placeholder="Write Here..."
              form={form}
              readOnly={true}
              validateName="under18NotAbleToGetHead"
            />
            <TextArea
              label="Do you report a task or idea numerous times to make sure it's okay?"
              required={true}
              placeholder="Write Here..."
              form={form}
              readOnly={true}
              validateName="under18TaskRepeat"
            />
            <TextArea
              label="Are you presented with absurd ideas or unpleasent ideas?"
              required={true}
              placeholder="Write Here..."
              form={form}
              readOnly={true}
              validateName="under18AbsurdUnpleasant"
            />

            <TextArea
              label="Are there thoughts you try to avoid at all costs?"
              required={true}
              placeholder="Write Here..."
              form={form}
              readOnly={true}
              validateName="under18AvoidThoughts"
            />
            <TextArea
              label="Are there things you are forces to do,or else you feel nervous?"
              required={true}
              placeholder="Write Here..."
              form={form}
              readOnly={true}
              validateName="under18FeelNervous"
            />
          </SimpleGrid>
        </Card>

        {/* Remarks */}
        <Card mt="sm">
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
              validateName="under18PhysicalDescription"
            />
            <TextArea
              label="Behavior observation"
              required={true}
              placeholder="Behavior observation"
              form={form}
              readOnly={true}
              validateName="under18BehaviourObservation"
            />
          </SimpleGrid>
        </Card>
      </form>
    </Container>
  );
};
