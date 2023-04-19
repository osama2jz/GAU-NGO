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

export const AgeFormAbove = ({ setActive, active, setAlldata,form ,submit}) => {
  const { classes } = useStyles();


  
  return (
    <Container size="lg">
      <Text fz={20} fw="bolder" align="center" mb={"xl"}>
        Psychology Form Over 18
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
            placeholder={"+34 99 9999 999"}
            mask="+34 99 9999 999"
            form={form}
          />
          <InputField
            label="Age"
            required={true}
            placeholder="Age"
            form={form}
            validateName="over18Age"
          />
          <InputField
            label="Sex"
            required={true}
            placeholder="Sex"
            form={form}
            validateName="over18Sex"
          />
          <InputField
            label=" Marital status"
            required={true}
            placeholder=" Marital status"
            form={form}
            validateName="over18MaritalStatus"
          />
          <InputField
            label="Profession"
            required={true}
            placeholder="Profession"
            form={form}
            validateName="over18Profession"
            />
          <InputField
            label="Studies"
            required={true}
            placeholder="Studies"
            form={form}
            validateName="over18Studies"
            />

          <InputField
            label="Address"
            required={true}
            placeholder="Address"
            form={form}
            validateName="over18Address"
            />
          <InputField
            label="Country"
            required={true}
            placeholder="Country"
            form={form}
            validateName="over18Origin"
            />
          <InputField
            label="Telephone"
            required={true}
            placeholder="Telephone"
            form={form}
            validateName="over18Telephone"
            />
          <InputField
            label="Couple"
            required={true}
            placeholder="Couple"
            form={form}
            validateName="over18Couple"
          />
          <InputField
            label="Children"
            required={true}
            placeholder="Children"
            form={form}
            validateName="over18Children"
          />
          <InputField
            label="Informant"
            required={true}
            placeholder="Informant"
            form={form}
            validateName="over18Informant"
          />
        </SimpleGrid>
        <TextArea
          placeholder={"Prior Psychological Care"}
          label="Prior Psychological Care"
          form={form}
          validateName="over18PriorPsychologicalCare"
        />
        </Card>

        {/* Consultation Reason */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>Reason for Consultation</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />
          <TextArea
            placeholder="Reason for Consultation"
            form={form}
            validateName="over18ReasonForConsultation"
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
            label={"Start Date"}
            form={form}
            validateName="over18StartDate"

            />
            <InputField
              label="Duration Of Problem"
              required={true}
              placeholder="Duration of Problem"
              form={form}
              validateName="over18Duration"
             
            />
            <TextArea
              label="Precipitating Factors"
              required={true}
              placeholder="Precipitating Factors"
              form={form}
              validateName="over18PrecipitatingFactors"
              rows={"2"}
            />
            <TextArea
              label="Impact of Problem on Subject And Family"
              required={true}
              placeholder="Impact of Problem"
              form={form}
              validateName="over18ImpactOfProblem"
              rows={"2"}
            />
            <TextArea
              label="Objective In Terms Of The Problem"
              required={true}
              placeholder="Objectives"
              form={form}
              validateName="over18Objective"
              rows={"2"}
            />
          </SimpleGrid>
        </Card>

        {/* Psychological History */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
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
              validateName="over18PreviousDevelopment"
              rows={"2"}
            />
            <TextArea
              label="Environment (Housing, Religion)"
              required={true}
              placeholder="Environment"
              form={form}
              validateName="over18Environment"
              rows={"2"}
            />
            <TextArea
              label="Habits"
              required={true}
              placeholder="Hygeine, Sleep, Food, Exercise"
              form={form}
              validateName="over18Habits"
              rows={"2"}
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
              label="Antenatal,Conception,Pregnancy and childbirth "
              required={true}
              placeholder="Antenatal,Conception,Pregnancy and childbirth "
              form={form}
              validateName="over18Antental"
              rows={"2"}
            />

            <TextArea
              label="Previous Development, Childhood and Adolescene"
              required={true}
              placeholder="Previous Development, Childhood and Adolescene"
              form={form}
              validateName="over18PreviousDevelopmentChildhood"
              rows={"2"}
            />

            <TextArea
              label="Environement (Housing, Religion)"
              required={true}
              placeholder="Environement (Housing, Religion)"
              form={form}
              validateName="over18StudiesEnvironment"
              rows={"2"}
            />
            <TextArea
              label="Habits"
              required={true}
              placeholder="Habits"
              form={form}
              validateName="over18StudiesHabits"
              rows={"2"}
            />
            <TextArea
              label=" Professional and Social Aspirations"
              required={true}
              placeholder=" Professional and Social Aspirations"
              form={form}
              validateName="over18StudiesProfessionalAspirations"
              rows={"2"}
            />
            <TextArea
              label="Previous Work"
              required={true}
              placeholder=" Previous Work"
              form={form}
              validateName="over18StudiesPreviousWorks"
              rows={"2"}
            />
          </SimpleGrid>
        </Card>

        {/** Family Relation */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>Family Relations</Text>
          <Divider color="#C8C8C8" mt="md" mb="md" />

          {/** Mother Relation */}
          <Card mt="sm">
            <Text className={classes.subHeading}>Mother Details</Text>
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
                placeholder="Number "
                form={form}
                validateName="over18MotherName"
              />
              <InputField
                label="Profession"
                required={true}
                placeholder="Profession"
                form={form}
                validateName="over18MotherProfession"
              />
              <InputField
                label="Age"
                required={true}
                placeholder="Age"
                form={form}
                validateName="over18MotherAge"
              />
            </SimpleGrid>
          </Card>

          {/** Father Relation */}
          <Card mt="sm">
            <Text className={classes.subHeading}>Father Details</Text>
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
                placeholder="Number "
                form={form}
                validateName="over18FatherName"
              />
              <InputField
                label="Profession"
                required={true}
                placeholder="Profession"
                form={form}
                validateName="over18FatherProfession"
              />
              <InputField
                label="Age"
                required={true}
                placeholder="Age"
                form={form}
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
              validateName="over18Siblings"
            />
          </Card>

          {/** Couple Relation */}
          <Card mt="sm">
            <Text className={classes.subHeading}>Couple Details</Text>
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
                placeholder="Name "
                form={form}
                validateName="over18CoupleName"
              />
              <InputField
                label="Profession"
                required={true}
                placeholder="Profession"
                form={form}
                validateName="over18CoupleProfession"
              />
              <InputField
                label="Age"
                required={true}
                placeholder="Age"
                form={form}
                validateName="over18CoupleAge"
              />
            </SimpleGrid>
          </Card>

          {/** Children Relation */}
          <Card mt="sm">
            <Text className={classes.subHeading}>Children Details</Text>
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
                placeholder="Name "
                form={form}
                validateName="over18ChildrenName"
              />
              <InputField
                label="Age"
                required={true}
                placeholder="Age"
                form={form}
                validateName="over18ChildrenAge"
              />
            </SimpleGrid>
          </Card>

          {/** Relation Relation */}
          <Card mt="sm">
            <Text className={classes.subHeading}>Relation</Text>
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
                placeholder="Mother "
                form={form}
                validateName="over18MotherRelation"
              />{" "}
              <InputField
                label="Father"
                required={true}
                placeholder="Father "
                form={form}
                validateName="over18FatherRelation"
              />{" "}
              <InputField
                label="Brothers"
                required={true}
                placeholder="Brothers "
                form={form}
                validateName="over18BrotherRelation"
              />
              <InputField
                label="Partner"
                required={true}
                placeholder="Partner "
                form={form}
                validateName="over18PartnerRelation"
              />
              <InputField
                label="Childs"
                required={true}
                placeholder="Childs"
                form={form}
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
              validateName="over18RelevantFamilyProblems"
            />
          </Card>
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
              label="Frequency of social contacts"
              required={true}
              placeholder="Frequency of social contacts"
              form={form}
              validateName="over18Frequency"
              rows={"2"}
            />
            <TextArea
              label="Ease of establishing new relationships and preserving them"
              required={true}
              placeholder="Ease of establishing new relationships "
              form={form}
              validateName="over18Ease"
              rows={"2"}
            />
            <TextArea
              label="Difficulties in Social Relationsships"
              required={true}
              placeholder="Difficulties in Social Relationsships"
              form={form}
              validateName="over18Difficulties"
              rows={"2"}
            />
            <TextArea
              label=" Does anyone currently disturb you?"
              required={true}
              placeholder=" Does anyone currently disturb you?"
              form={form}
              validateName="over18CurrentDisturbance"
              rows={"2"}
            />
            <TextArea
              label="Does anyone help you  or would help you?  "
              required={true}
              placeholder="Does anyone help you  or would help you?  "
              form={form}
              validateName="over18AnyOneHelp"
              rows={"2"}
            />
          </SimpleGrid>
        </Card>

        {/* Interests and motivations */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
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
              validateName="over18TakesMostTime"
            />
            <TextArea
              label="How he/she likes to have fun?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="over18HowFun"
            />
            <TextArea
              label="Where is he/she most comfortable?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="over18ComfortableSituations"
            />
            <TextArea
              label="Which person is the most important in his/her life?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="over18ImportantPerson"
            />
            <TextArea
              label="What is his/her most important concerns?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="over18ImportantConcerns"
            />
            <TextArea
              label="What things he/she wishes to change in his/her life?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="over18ChangeThings"
            />
            <TextArea
              label="What does he/she expect from others?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="over18ExpectFromOthers"
            />
            <TextArea
              label="What is his/her greatest illusions?"
              required={true}
              placeholder="answer"
              form={form}
              rows={"2"}
              validateName="over18GreatestIllusion"
            />
          </SimpleGrid>
        </Card>

        {/* Sexuality */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
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
              validateName="over18CurrentRelationship"
            />
            <TextArea
              label="Problems specific to this area"
              required={true}
              placeholder="Problems specific to this area"
              form={form}
              rows={"2"}
              validateName="over18SpecificProblems"
            />
            <TextArea
              label=" Menstrual or genital problems"
              required={true}
              placeholder=" Menstrual or genital problems"
              form={form}
              rows={"2"}
              validateName="over18GenitalProblems"
            />
            <TextArea
              label="Areas of compatibility with the couple"
              required={true}
              placeholder="Areas of compatibility with the couple"
              form={form}
              rows={"2"}
              validateName="over18AreasofCompatibility"
            />
            <TextArea
              label="Areas of incompatibility"
              required={true}
              placeholder="Areas of incompatibility"
              form={form}
              validateName="over18AreasofIncompatibility"
              rows={"2"}
            />
            <TextArea
              label="Level of communication"
              required={true}
              placeholder="Level of communication"
              form={form}
              validateName="over18CommunicationLevel"
              rows={"2"}
            />
            <TextArea
              label="Previous sexual intercourse"
              required={true}
              placeholder="Previous sexual intercourse"
              form={form}
              validateName="over18PreviousIntercourse"
              rows={"2"}
            />
            <TextArea
              label="Extramarital affairs"
              required={true}
              placeholder="Extramarital affairs"
              form={form}
              validateName="over18ExtraMaritalAffairs"
              rows={"2"}
            />
          </SimpleGrid>
        </Card>

        {/* Obsessive Problems */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
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
              validateName="over18NotAbleToGetHead"
              rows={"2"}
            />
            <TextArea
              label="Are you presented with absurd or unpleasant ideas? "
              required={true}
              placeholder="Are you presented with absurd or unpleasant ideas? "
              form={form}
              validateName="over18AbsurdUnpleasant"
              rows={"2"}
            />
            <TextArea
              label="Are there things you are forced to do, or  you feel nervous?"
              required={true}
              placeholder="Are there  things  you are forced to do, or else  you feel nervous?"
              form={form}
              validateName="over18FeelNervous"
              rows={"2"}
            />
            <TextArea
              label="Are there thoughts you try  to  avoid at all costs?"
              required={true}
              placeholder="Are there thoughts you try  to  avoid at all costs?"
              form={form}
              rows={"2"}
              validateName="over18AvoidThoughts"
            />
            <TextArea
              label="Do you repeat  a task or idea  numerous times to make sure it's okay? "
              required={true}
              placeholder="Do you repeat  a task or idea  numerous times to make sure it's okay? "
              form={form}
              rows={"2"}
              validateName="over18TaskRepeat"
            />
          </SimpleGrid>
        </Card>

        {/* Organic and psychosomatic pathology */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Text className={classes.subHeading}>
            Organic and psychosomatic pathology
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
              validateName="over18MajorIllness"
            />
            <TextArea
              label="Diseases you currently suffer from "
              required={true}
              placeholder="Diseases you currently suffer from "
              form={form}
              validateName="over18Diseases"
            />
            <TextArea
              label="Illnesses in other   family members"
              required={true}
              placeholder="Illnesses in other   family members"
              form={form}
              validateName="over18Illness"
            />
            <TextArea
              label="Do you currently feel  any physical  discomfort?"
              required={true}
              placeholder="Do you currently feel  any physical  discomfort?"
              form={form}
              validateName="over18PhysicalDiscomfort"
            />
            <TextArea
              label="Relevant medication"
              required={true}
              placeholder="Relevant medication"
              form={form}
              validateName="over18RelevantMedication"
            />
          </SimpleGrid>
        </Card>

        {/* Remarks */}
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
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
              validateName="over18PhysicalDescription"
            />
            <TextArea
              label="Behavior observation"
              required={true}
              placeholder="Behavior observation"
              form={form}
              validateName="over18BehaviourObservation"
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
