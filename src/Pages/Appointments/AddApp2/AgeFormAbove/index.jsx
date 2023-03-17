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
export const AgeFormAbove = ({ setActive, active, setAlldata }) => {
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
      <Text fz={20} fw="bolder" align="center" mb={"xl"}>
        Psychology Form Over 18
      </Text>
      <form
        className={classes.form}
        onSubmit={form.onSubmit(() => {
          submitAll(form.values);
        })}
      >
        <Text className={classes.subHeading}>Parentage Information</Text>
        <Divider color="#C8C8C8" mt="md" mb="md" />
        <SimpleGrid
          breakpoints={[
            { minWidth: "md", cols: 4 },
            { minWidth: "lg", cols: 5 },
            { minWidth: "xs", cols: 2 },
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
            label=" Marital status"
            required={true}
            placeholder=" Marital status"
            form={form}
            validateName="sex"
          />
          <InputField
            label="Profession"
            required={true}
            placeholder="Profession"
            form={form}
            validateName="sex"
          />
          <InputField
            label="Studies"
            required={true}
            placeholder="Studies"
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
            label="Country"
            required={true}
            placeholder="Country"
            form={form}
            validateName="origin"
          />
          <InputField
            label="Telephone"
            required={true}
            placeholder="Telephone"
            form={form}
            validateName="sac"
          />
          <InputField
            label="Couple"
            required={true}
            placeholder="Couple"
            form={form}
            validateName="lives"
          />
          <InputField
            label="Children"
            required={true}
            placeholder="Children"
            form={form}
            validateName="sex"
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
              rows={"2"}

            />
            <TextArea
              label="Precipitating Factors"
              required={true}
              placeholder="Precipitating Factors"
              form={form}
              validateName="pf"
              rows={"2"}

            />
            <TextArea
              label="Impact of Problem on Subject And Family"
              required={true}
              placeholder="Impact of Problem"
              form={form}
              validateName="impact"
              rows={"2"}

            />
            <TextArea
              label="Objective In Terms Of The Problem"
              required={true}
              placeholder="Objectives"
              form={form}
              validateName="objectives"
              rows={"2"}

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
              label="Previous Development, Childhood and Adolescene"
              required={true}
              placeholder="Previous Development, Childhood and Adolescene"
              form={form}
              validateName="pdca"
              rows={"2"}

            />
            <TextArea
              label="Environment (Housing, Religion)"
              required={true}
              placeholder="Environment"
              form={form}
              validateName="env"
              rows={"2"}

            />
            <TextArea
              label="Habits"
              required={true}
              placeholder="Hygeine, Sleep, Food, Exercise"
              form={form}
              validateName="habits"
              rows={"2"}

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
              rows={"2"}
            />
           
            <TextArea
              label="Relationship with Co-workers "
              required={true}
              placeholder="Relationship with Co-workers"
              form={form}
              validateName="rt"
              rows={"2"}
            />
            <TextArea
              label="Labor problems"
              required={true}
              placeholder="Labor problems"
              form={form}
              validateName="spld"
              rows={"2"}
            />
            <TextArea
              label="Professional and social aspirations"
              required={true}
              placeholder="Professional and social aspirations"
              form={form}
              validateName="ca"
              rows={"2"}
            />
            <TextArea
              label=" Previous works"
              required={true}
              placeholder=" Previous works"
              form={form}
              validateName="extra"
              rows={"2"}
            />
           
          </SimpleGrid>
        </Card>

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
              rows={"2"}

            />
            <TextArea
              label="Level of Dependency"
              required={true}
              placeholder="Level of Dependency"
              form={form}
              validateName="lod"
              rows={"2"}
            
            />
            <TextArea
              label="Relevant Family Problems"
              required={true}
              placeholder="Relevant Family Problems"
              form={form}
              rows={"2"}
              validateName="rfp"
            />
            <TextArea
              label="Time Dedicated by Parents to Family Coexistance"
              required={true}
              placeholder="Time Dedicated by Parents to Family Coexistance"
              form={form}
              rows={"2"}
              validateName="tdpfc"
            />
            <TextArea
              label="Relationship Between Parents"
              required={true}
              placeholder="Relationship Between Parents"
              form={form}
              rows={"2"}
              validateName="rbp"
            />
            <TextArea
              label="Economic Situation"
              required={true}
              placeholder="Economic Situation"
              form={form}
              rows={"2"}
              validateName="eco"
            />
            <TextArea
              label="Important Events"
              required={true}
              placeholder="eg. Trips, Deaths"
              form={form}
              rows={"2"}
              validateName="trips"
            />
            <TextArea
              label="Application of Rewards and Punishment"
              required={true}
              placeholder="Application of Rewards and Punishment"
              form={form}
              rows={"2"}
              validateName="aprp"
            />
          </SimpleGrid>
        </Card>

        {/* Social Relations */}
        <Card mt="sm">
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
              label="Frequency of social contacts"
              required={true}
              placeholder="Frequency of social contacts"
              form={form}
              validateName="friends"
              rows={"2"}
            />
            <TextArea
              label="Ease of establishing new relationships and preserving them"
              required={true}
              placeholder="Ease of establishing new relationships "
              form={form}
              validateName="ati"
              rows={"2"}

            />
            <TextArea
              label="Difficulties in Social Relationsships"
              required={true}
              placeholder="Difficulties in Social Relationsships"
              form={form}
              validateName="dsr"
              rows={"2"}

            />
            <TextArea
              label=" Does anyone currently disturb you?"
              required={true}
              placeholder=" Does anyone currently disturb you?"
              form={form}
              validateName="dsr"
              rows={"2"}

            />
            <TextArea
              label="Does anyone help you  or would help you?  "
              required={true}
              placeholder="Does anyone help you  or would help you?  "
              form={form}
              validateName="dsr"
              rows={"2"}

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
              rows={"2"}
              validateName="interests1"
            />
            <TextArea
              label="How he/she likes to have fun?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="interests2"
            />
            <TextArea
              label="Where is he/she most comfortable?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="interests3"
            />
            <TextArea
              label="Which person is the most important in his/her life?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="interests4"
            />
            <TextArea
              label="What is his/her most important concerns?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="interests5"
            />
            <TextArea
              label="What things he/she wishes to change in his/her life?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="interests6"
            />
            <TextArea
              label="What does he/she expect from others?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="interests7"
            />
            <TextArea
              label="What is his/her greatest illusions?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="interests8"
            />
          </SimpleGrid>
        </Card>

        {/* Sexuality */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Sexuality and couple</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 2 },
              { minWidth: "xs", cols: 1 },
            ]}
          >
            <TextArea
              label=" Current relationships is Satisfactory or not"
              required={true}
              placeholder=" Current relationships is Satisfactory or not	"
              form={form}
              rows={"2"}
              validateName="friends"
            />
            <TextArea
              label="Problems specific to this area"
              required={true}
              placeholder="Problems specific to this area"
              form={form}
              rows={"2"}
              validateName="ati"
            />
            <TextArea
              label=" Menstrual or genital problems"
              required={true}
              placeholder=" Menstrual or genital problems"
              form={form}
              rows={"2"}
              validateName="dsr"
            />
            <TextArea
              label="Areas of compatibility with the couple"
              required={true}
              placeholder="Areas of compatibility with the couple"
              form={form}
              rows={"2"}
              validateName="dsr"
            />
              <TextArea
              label="Areas of incompatibility"
              required={true}
              placeholder="Areas of incompatibility"
              form={form}
              validateName="dsr"
              rows={"2"}
            />
            <TextArea
              label="Level of communication"
              required={true}
              placeholder="Level of communication"
              form={form}
              validateName="dsr"
              rows={"2"}
            />
            <TextArea
              label="Previous sexual intercourse"
              required={true}
              placeholder="Previous sexual intercourse"
              form={form}
              validateName="dsr"
              rows={"2"}
            />
            <TextArea
              label="Extramarital affairs"
              required={true}
              placeholder="Extramarital affairs"
              form={form}
              validateName="dsr"
              rows={"2"}
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
              label="Do you have ideas that you are not able to get out of  head?"
              required={true}
              placeholder="Do you have ideas that  you are not able to get out of your head?"
              form={form}
              validateName="friends"
              rows={"2"}
            />
            <TextArea
              label="Are you presented with absurd or unpleasant ideas? "
              required={true}
              placeholder="Are you presented with absurd or unpleasant ideas? "
              form={form}
              validateName="ati"
              rows={"2"}

            />
            <TextArea
              label="Are there things you are forced to do, or  you feel nervous?"
              required={true}
              placeholder="Are there  things  you are forced to do, or else  you feel nervous?"
              form={form}
              validateName="dsr"
              rows={"2"}

            />
            <TextArea
              label="Are there thoughts you try  to  avoid at all costs?"
              required={true}
              placeholder="Are there thoughts you try  to  avoid at all costs?"
              form={form}
              rows={"2"}
              validateName="dsr"
            />
            <TextArea
              label="Do you repeat  a task or idea  numerous times to make sure it's okay? "
              required={true}
              placeholder="Do you repeat  a task or idea  numerous times to make sure it's okay? "
              form={form}
              rows={"2"}
              validateName="dsr"
            />
          </SimpleGrid>
        </Card>

            {/* hello */}
        <Card mt="sm">
          <Text className={classes.subHeading}>Organic and psychosomatic pathology</Text>
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
              validateName="friends"
            />
            <TextArea
              label="Diseases you currently suffer from "
              required={true}
              placeholder="Diseases you currently suffer from "
              form={form}
              validateName="ati"
            />
            <TextArea
              label="Illnesses in other   family members"
              required={true}
              placeholder="Illnesses in other   family members"
              form={form}
              validateName="dsr"
            />
            <TextArea
              label="Do you currently feel  any physical  discomfort?"
              required={true}
              placeholder="Do you currently feel  any physical  discomfort?"
              form={form}
              validateName="dsr"
            />
            <TextArea
              label="Relevant medication"
              required={true}
              placeholder="Relevant medication"
              form={form}
              validateName="dsr"
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
              validateName="ati"
            />
            <TextArea
              label="Behavior observation"
              required={true}
              placeholder="Behavior observation"
              form={form}
              validateName="friends"
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
