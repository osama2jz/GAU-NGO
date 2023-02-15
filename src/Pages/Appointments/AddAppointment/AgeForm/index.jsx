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
export const AgeForm = ({ setActive, active, setAlldata }) => {
  const { classes } = useStyles();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      dateOfBirth: "",
      passport: "",
      nationality: "",
      origin: "",
      domicile: "",
      muncipality: "",
      revenue: "",
      expenses: "",
      aidsBonuses: "",
      debt: "",
      housing: "",
      education: "",
      char: "",
      training: "",
      realization: "",
      healthAspects: "",
      socioFamily: "",
      tracking: "",
      demand: "",
      social: "",
      labour: "",
      educational: "",
      institutional: "",
      familiar: "",
    },
    // validate: {
    //   dateOfBirth: (value) =>
    //     value.length < 1 ? "Please enter your date of Birth" : null,
    //   age: (value) => (value.length < 1 ? "Please enter your Age" : null),
    //   passport: (value) => (value.length < 1 ? "Please enter passport" : null),
    //   nationality: (value) =>
    //     value.length < 1 ? "Please enter nationality" : null,
    //   origin: (value) => (value.length < 1 ? "Please enter origin" : null),
    //   domicile: (value) => (value.length < 1 ? "Please enter domicile" : null),
    //   muncipality: (value) =>
    //     value.length < 1 ? "Please enter muncipality" : null,
    //   revenue: (value) => (value.length < 1 ? "Please enter revenue" : null),
    //   expenses: (value) => (value.length < 1 ? "Please enter expenses" : null),
    //   aidsBonuses: (value) =>
    //     value.length < 1 ? "Please enter Aids or Bonuses" : null,
    //   debt: (value) => (value.length < 1 ? "Please enter debt" : null),
    //   housing: (value) => (value.length < 1 ? "Please enter housing" : null),
    //   education: (value) =>
    //     value.length < 1 ? "Please enter education level" : null,
    //   char: (value) =>
    //     value.length < 1 ? "Please enter Characteristics" : null,
    //   training: (value) =>
    //     value.length < 1 ? "Please enter Complementary Trainging " : null,
    //   realization: (value) =>
    //     value.length < 1 ? "Please enter realization year" : null,
    // },
  });

  const submitAll = (values) => {
    setActive(active + 1);
    setAlldata(values);
  };
  return (
    <Container size="lg">
      <form
        className={classes.form}
        onSubmit={form.onSubmit(() => {
          submitAll(form.values);
        })}
      >
        <Text className={classes.subHeading}>Parantage Information</Text>
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
            placeholder="Number"
            form={form}
            validateName="number"
          />
          <InputField
            label="Age"
            required={true}
            placeholder="Age"
            form={form}
            validateName="age"
          />
          <InputField
            label="Sex"
            required={true}
            placeholder="Sex"
            form={form}
            validateName="sex"
          />
          <InputField
            label="Address"
            required={true}
            placeholder="Address"
            form={form}
            validateName="address"
          />
          <InputField
            label="Origin"
            required={true}
            placeholder="Origin"
            form={form}
            validateName="origin"
          />
          <InputField
            label="School and Course"
            required={true}
            placeholder="School and Course"
            form={form}
            validateName="sac"
          />
          <InputField
            label="Lives With"
            required={true}
            placeholder="Lives with"
            form={form}
            validateName="lives"
          />
          <InputField
            label="Informant"
            required={true}
            placeholder="Informant"
            form={form}
            validateName="informant"
          />
        </SimpleGrid>
        <TextArea
          placeholder={"Prior Psychological Care"}
          label="Prior Psychological Care"
        />

        {/** Parental Details */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Parental Details</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <InputField
              label="Number"
              required={true}
              placeholder="Number "
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

        {/* Mother's Details */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Mother's Details</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <InputField
              label="Number"
              required={true}
              placeholder="Number "
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
        <Card mt="sm">
          <Text className={classes.subHeading}>Siblings Details</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <InputField
              label="Number"
              required={true}
              placeholder="Number "
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

        {/* Consultation Reason */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Reason for Consultation</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <TextArea
            placeholder="Reason for Consultation"
            form={form}
            validateName="socioFamily"
          />
        </Card>

        {/* History of Current Problem */}
        <Card mt="sm">
          <Text className={classes.subHeading}>History of Current Problem</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="Start Date And Duration Of Problem"
              required={true}
              placeholder="Date and duration"
              form={form}
              validateName="dateDuration"
            />
            <TextArea
              label="Precipitating Factors"
              required={true}
              placeholder="Precipitating Factors"
              form={form}
              validateName="pf"
            />
            <TextArea
              label="Impact of Problem on Subject And Family"
              required={true}
              placeholder="Impact of Problem"
              form={form}
              validateName="impact"
            />
            <TextArea
              label="Objective In Terms Of The Problem"
              required={true}
              placeholder="Objectives"
              form={form}
              validateName="objectives"
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
              validateName="acpc"
            />
            <TextArea
              label="Previous Development, Childhood and Adolescene"
              required={true}
              placeholder="Previous Development, Childhood and Adolescene"
              form={form}
              validateName="pdca"
            />
            <TextArea
              label="Environment (Housing, Religion)"
              required={true}
              placeholder="Environment"
              form={form}
              validateName="env"
            />
            <TextArea
              label="Habits"
              required={true}
              placeholder="Hygeine, Sleep, Food, Exercise"
              form={form}
              validateName="habits"
            />
          </SimpleGrid>
        </Card>

        {/* Studies and Occupation */}
        <Card mt="sm">
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
              validateName="eduLevel"
            />
            <TextArea
              label="Relationship with Classmates"
              required={true}
              placeholder="Relationship with Classmates"
              form={form}
              validateName="rc"
            />
            <TextArea
              label="Relationship with Teachers"
              required={true}
              placeholder="Relationship with Teachers"
              form={form}
              validateName="rt"
            />
            <TextArea
              label="School Problems, Learning Difficulties"
              required={true}
              placeholder="School Problems, Learning Difficulties"
              form={form}
              validateName="spld"
            />
            <TextArea
              label="Career Aspiration"
              required={true}
              placeholder="Career Aspiration"
              form={form}
              validateName="ca"
            />
            <TextArea
              label="Extra Curricular Activities"
              required={true}
              placeholder="Extra Curricular Activities"
              form={form}
              validateName="extra"
            />
            <TextArea
              label="Attitude Towards Studies and Exams"
              required={true}
              placeholder="Attitude Towards Studies and Exams"
              form={form}
              validateName="atse"
            />
            <TextArea
              label="Parents Attitude Towards School Performance"
              required={true}
              placeholder="Parents Attitude Towards School Performance"
              form={form}
              validateName="patsp"
            />
          </SimpleGrid>
        </Card>

        {/* Family Relations */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Family Relations</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label="Relations"
              required={true}
              placeholder="Relations"
              form={form}
              validateName="relations"
            />
            <TextArea
              label="Level of Dependency"
              required={true}
              placeholder="Level of Dependency"
              form={form}
              validateName="lod"
            />
            <TextArea
              label="Relevant Family Problems"
              required={true}
              placeholder="Relevant Family Problems"
              form={form}
              validateName="rfp"
            />
            <TextArea
              label="Time Dedicated by Parents to Family Coexistance"
              required={true}
              placeholder="Time Dedicated by Parents to Family Coexistance"
              form={form}
              validateName="tdpfc"
            />
            <TextArea
              label="Relationship Between Parents"
              required={true}
              placeholder="Relationship Between Parents"
              form={form}
              validateName="rbp"
            />
            <TextArea
              label="Economic Situation"
              required={true}
              placeholder="Economic Situation"
              form={form}
              validateName="eco"
            />
            <TextArea
              label="Important Events"
              required={true}
              placeholder="eg. Trips, Deaths"
              form={form}
              validateName="trips"
            />
            <TextArea
              label="Application of Rewards and Punishment"
              required={true}
              placeholder="Application of Rewards and Punishment"
              form={form}
              validateName="aprp"
            />
          </SimpleGrid>
        </Card>

        {/* Social Relations */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Family Relations</Text>
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
              validateName="friends"
            />
            <TextArea
              label="Ability to Interact. Ease of Establishing New Relationships"
              required={true}
              placeholder="Ability to Interact"
              form={form}
              validateName="ati"
            />
            <TextArea
              label="Difficulties in Social Relationsships"
              required={true}
              placeholder="Difficulties in Social Relationsships"
              form={form}
              validateName="dsr"
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
              placeholder="answer"
              form={form}
              validateName="interests1"
            />
            <TextArea
              label="How he/she likes to have fun?"
              required={true}
              placeholder="answer"
              form={form}
              validateName="interests2"
            />
            <TextArea
              label="Where is he/she most comfortable?"
              required={true}
              placeholder="answer"
              form={form}
              validateName="interests3"
            />
            <TextArea
              label="Which person is the most important in his/her life?"
              required={true}
              placeholder="answer"
              form={form}
              validateName="interests4"
            />
            <TextArea
              label="What is his/her most important concerns?"
              required={true}
              placeholder="answer"
              form={form}
              validateName="interests5"
            />
            <TextArea
              label="What things he/she wishes to change in his/her life?"
              required={true}
              placeholder="answer"
              form={form}
              validateName="interests6"
            />
            <TextArea
              label="What does he/she expect from others?"
              required={true}
              placeholder="answer"
              form={form}
              validateName="interests7"
            />
            <TextArea
              label="What is his/her greatest illusions?"
              required={true}
              placeholder="answer"
              form={form}
              validateName="interests8"
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
