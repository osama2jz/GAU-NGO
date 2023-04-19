import {
  Card,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import Button from "../../../../Components/Button";
import InputField from "../../../../Components/InputField";
import TextArea from "../../../../Components/TextArea";
import { useStyles } from "../styles";
import InputMask from "react-input-mask";
import Datepicker from "../../../../Components/Datepicker";

export const AgeForm = ({ setActive, active, setAlldata, form,submit }) => {
  const { classes } = useStyles();

  // console.log(form.values)
  // const submitAll = (values) => {
  //   setActive(active);
  //   // setAlldata(values);
  // };
  return (
    <Container size="lg">
      <Text fz={20} fw="bolder" align="center" mb={"xl"}>
        Psychology Form Under 18
      </Text>
      <form
        className={classes.form}
        onSubmit={form.onSubmit(() => {
          submit();
        })}
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>Parentage Information</Text>
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
              placeholder="+34 91 1234 567"
              component={InputMask}
              mask="+34 99 9999 999"
              form={form}
              validateName="under18Number"
            />
            <InputField
              label="Age"
              required={true}
              placeholder="Age"
              form={form}
              validateName="under18Age"
            />
            <InputField
              label="Sex"
              required={true}
              placeholder="Sex"
              form={form}
              validateName="under18Sex"
            />
            <InputField
              label="School and Course"
              required={true}
              placeholder="School and Course"
              form={form}
              validateName="under18SchoolCourse"
            />
            <InputField
              label="Lives With"
              required={true}
              placeholder="Lives with"
              form={form}
              validateName="under18LiveWith"
            />

            <InputField
              label="Informant"
              required={true}
              placeholder="Informant"
              form={form}
              validateName="under18Informant"
            />
          </SimpleGrid>
          <TextArea
            placeholder={"Prior Psychological Care"}
            label="Prior Psychological Care"
            form={form}
            validateName="under18PriorPsychologicalCare"
          />
        </Card>

        {/** Parental Details */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>Parental Details</Text>
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
              placeholder="+34 91 1234 567"
              component={InputMask}
              mask="+34 99 9999 999"
              form={form}
              validateName="under18ParentalNumber"
            />
            <InputField
              label="Age"
              required={true}
              placeholder="Age"
              form={form}
              validateName="under18ParentalAge"
            />
            <InputField
              label="Profession"
              required={true}
              placeholder="Profession"
              form={form}
              validateName="under18ParentalProfession"
            />
            <InputField
              label="Diseases"
              required={true}
              placeholder="Diseases"
              form={form}
              validateName="under18ParentalDisease"
            />
          </SimpleGrid>
        </Card>

        {/* Mother's Details */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Mother's Details</Text>
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
              placeholder="+34 91 1234 567"
              component={InputMask}
              mask="+34 99 9999 999"
              form={form}
              validateName="number2"
            />
            <InputField
              label="Age"
              required={true}
              placeholder="Age"
              form={form}
              validateName="age2"
            />
            <InputField
              label="Profession"
              required={true}
              placeholder="Profession"
              form={form}
              validateName="profession"
            />
            <InputField
              label="Diseases"
              required={true}
              placeholder="Diseases"
              form={form}
              validateName="diseases"
            />
          </SimpleGrid>
        </Card>

        {/* Siblings Details */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>Siblings Details</Text>
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
              placeholder="+34 91 1234 567"
              component={InputMask}
              mask="+34 99 9999 999"
              form={form}
              validateName="under18SiblingsNumber"
            />
            <InputField
              label="Age"
              required={true}
              placeholder="Age"
              form={form}
              validateName="under18SiblingsAge"
            />
            <InputField
              label="Profession"
              required={true}
              placeholder="Profession"
              form={form}
              validateName="under18SiblingsProfession"
            />
            <InputField
              label="Diseases"
              required={true}
              placeholder="Diseases"
              form={form}
              validateName="under18SiblingsDisease"
            />
          </SimpleGrid>
        </Card>

        {/* Consultation Reason */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>Reason for Consultation</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <TextArea
            placeholder="Reason for Consultation"
            form={form}
            validateName="under18ReasonForConsultation"
          />
        </Card>

        {/* History of Current Problem */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>History of Current Problem</Text>
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
              validateName="under18StartDate"
            />
            <InputField
              label="Duration Of Problem"
              required={true}
              placeholder="duration"
              form={form}
              validateName="under18Duration"
            />
            <TextArea
              label="Precipitating Factors"
              required={true}
              placeholder="Precipitating Factors"
              form={form}
              validateName="under18PrecipitatingFactors"
            />
            <TextArea
              label="Impact of Problem on Subject And Family"
              required={true}
              placeholder="Impact of Problem"
              form={form}
              validateName="under18ImpactOfProblem"
            />
            <TextArea
              label="Objective In Terms Of The Problem"
              required={true}
              placeholder="Objectives"
              form={form}
              validateName="under18Objective"
            />
          </SimpleGrid>
        </Card>

        {/* Psychological History */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Psychological History</Text>
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
              validateName="under18Antental"
            />
            <TextArea
              label="Previous Development, Childhood and Adolescene"
              required={true}
              placeholder="Previous Development, Childhood and Adolescene"
              form={form}
              validateName="under18PreviousDevelopment"
            />
            <TextArea
              label="Environment (Housing, Religion)"
              required={true}
              placeholder="Environment"
              form={form}
              validateName="under18Environment"
            />
            <TextArea
              label="Habits"
              required={true}
              placeholder="Hygeine, Sleep, Food, Exercise"
              form={form}
              validateName="under18Habits"
            />
          </SimpleGrid>
        </Card>

        {/* Studies and Occupation */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>Studies and Occupation</Text>
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
              validateName="under18EducationLevel"
            />
            <TextArea
              label="Relationship with Classmates"
              required={true}
              placeholder="Relationship with Classmates"
              form={form}
              validateName="under18RelationClassMates"
            />
            <TextArea
              label="Relationship with Teachers"
              required={true}
              placeholder="Relationship with Teachers"
              form={form}
              validateName="under18RelationshipTeachers"
            />
            <TextArea
              label="School Problems, Learning Difficulties"
              required={true}
              placeholder="School Problems, Learning Difficulties"
              form={form}
              validateName="under18SchoolProblems"
            />
            <TextArea
              label="Career Aspiration"
              required={true}
              placeholder="Career Aspiration"
              form={form}
              validateName="under18CareerAspirations"
            />
            <TextArea
              label="Extra Curricular Activities"
              required={true}
              placeholder="Extra Curricular Activities"
              form={form}
              validateName="under18ExtraCiricularActivities"
            />
            <TextArea
              label="Attitude Towards Studies and Exams"
              required={true}
              placeholder="Attitude Towards Studies and Exams"
              form={form}
              validateName="under18AttitudeExams"
            />
            <TextArea
              label="Parents Attitude Towards School Performance"
              required={true}
              placeholder="Parents Attitude Towards School Performance"
              form={form}
              validateName="under18ParentsAttitude"
            />
          </SimpleGrid>
        </Card>

        {/* Family Relations */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>Family Relations</Text>
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
              validateName="under18MotherName"
            />
            <InputField
              label="Father"
              required={true}
              placeholder="Father"
              form={form}
              validateName="under18FatherName"
            />
            <InputField
              label="Siblings"
              required={true}
              placeholder="Siblings"
              form={form}
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
              validateName="under18DependencyLevel"
            />
            <TextArea
              label="Relevant Family Problems"
              required={true}
              placeholder="Relevant Family Problems"
              form={form}
              validateName="under18RelevantFamilyProblems"
            />
            <TextArea
              label="Time Dedicated by Parents to Family Coexistance"
              required={true}
              placeholder="Time Dedicated by Parents to Family Coexistance"
              form={form}
              validateName="under18TimeDedicated"
            />
            <TextArea
              label="Relationship Between Parents"
              required={true}
              placeholder="Relationship Between Parents"
              form={form}
              validateName="under18RelationshipBetweenParents"
            />

            <TextArea
              label="Important Events"
              required={true}
              placeholder="eg. Trips, Deaths"
              form={form}
              validateName="under18ImportantEvents"
            />
            <TextArea
              label="Application of Rewards and Punishment"
              required={true}
              placeholder="Application of Rewards and Punishment"
              form={form}
              validateName="under18ApplicationOfReward"
            />
          </SimpleGrid>
        </Card>

        {/* Social Relations */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>Social Relations</Text>
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
              validateName="under18Friends"
            />
            <TextArea
              label="Ability to Interact. Ease of Establishing New Relationships"
              required={true}
              placeholder="Ability to Interact"
              form={form}
              validateName="under18Interact"
            />
            <TextArea
              label="Difficulties in Social Relationsships"
              required={true}
              placeholder="Difficulties in Social Relationsships"
              form={form}
              validateName="under18Difficulties"
            />
          </SimpleGrid>
        </Card>

        {/* Interests and motivations */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Interests and Motivations</Text>
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
              placeholder="Write here ..."
              form={form}
              validateName="under18TakesMostTime"
            />
            <TextArea
              label="How he/she likes to have fun?"
              required={true}
              placeholder="Write here ..."
              form={form}
              validateName="under18HowFun"
            />
            <TextArea
              label="Where is he/she most comfortable?"
              required={true}
              placeholder="Write here ..."
              form={form}
              validateName="under18ComfortableSituations"
            />
            <TextArea
              label="Which person is the most important in his/her life?"
              required={true}
              placeholder="Write here ..."
              form={form}
              validateName="under18ImportantPerson"
            />
            <TextArea
              label="What is his/her most important concerns?"
              required={true}
              placeholder="Write here ..."
              form={form}
              validateName="under18ImportantConcerns"
            />
            <TextArea
              label="What things he/she wishes to change in his/her life?"
              required={true}
              placeholder="Write here ..."
              form={form}
              validateName="under18ChangeThings"
            />
            <TextArea
              label="What does he/she expect from others?"
              required={true}
              placeholder="Write here ..."
              form={form}
              validateName="under18ExpectFromOthers"
            />
            <TextArea
              label="What is his/her greatest illusions?"
              required={true}
              placeholder="Write here ..."
              form={form}
              validateName="under18GreatestIllusion"
            />
          </SimpleGrid>
        </Card>

        {/* Sexuality */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Sexuality</Text>
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
              validateName="under18SexualGames"
            />
            <TextArea
              label="Sexual curiosity in Childhood"
              required={true}
              placeholder="Sexual curiosity in Childhood"
              form={form}
              validateName="under18SexualCurosity"
            />
            <TextArea
              label="Level of Sex Education by Parents"
              required={true}
              placeholder="Level of Sex Education by Parents"
              form={form}
              validateName="under18LevelOfSexEducation"
            />
            <TextArea
              label="Sexual Development"
              required={true}
              placeholder="Sexual Development"
              form={form}
              validateName="under18SexualDevelopment"
            />
          </SimpleGrid>
        </Card>

        {/* Obsessive Problems */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Obsessive Problems</Text>
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
              placeholder="Write here ..."
              form={form}
              validateName="under18NotAbleToGetHead"
            />
            <TextArea
              label="Do you report a task or idea numerous times to make sure it's okay?"
              required={true}
              placeholder="Write here ..."
              form={form}
              validateName="under18TaskRepeat"
            />
            <TextArea
              label="Are you presented with absurd ideas or unpleasent ideas?"
              required={true}
              placeholder="Write here ..."
              form={form}
              validateName="under18AbsurdUnpleasant"
            />

            <TextArea
              label="Are there thoughts you try to avoid at all costs?"
              required={true}
              placeholder="Write here ..."
              form={form}
              validateName="under18AvoidThoughts"
            />
            <TextArea
              label="Are there things you are forces to do,or else you feel nervous?"
              required={true}
              placeholder="Write here ..."
              form={form}
              validateName="under18FeelNervous"
            />
          </SimpleGrid>
        </Card>

        {/* Remarks */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Remarks</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="Physical description "
              required={true}
              placeholder="Physical description "
              form={form}
              validateName="under18PhysicalDescription"
            />
            <TextArea
              label="Behavior observation"
              required={true}
              placeholder="Behavior observation"
              form={form}
              validateName="under18BehaviourObservation"
            />
          </SimpleGrid>
        </Card>
        <Group position="center" mt="xl">
          <Button onClick={() => setActive(active - 1)} label="Back" />
          <Button label={"Save & Next"} primary={true} type="submit" />
        </Group>
      </form>
    </Container>
  );
};
