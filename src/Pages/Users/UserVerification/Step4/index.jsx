import { Checkbox, Container, Text } from "@mantine/core";
import { useStyles } from "../styles";

export const Step4 = () => {
  const { classes } = useStyles();
  return (
    <Container size="xl" p={"lg"} className={classes.consent}>
      <Text>
        MADRID, on date SOCIAL AND CULTURAL ASSOCIATION CASA DE PAZ is
        responsible for the processing of the personal data of the interested
        party and informs you that these data will be treated in accordance with
        the provisions of Regulation (EU) 2016/679 of April 27, 2016 (GDPR) and
        Organic Law 3/2018 of December 5 (LOPDGDD), so the following treatment
        information is provided: LEGITIMATION AND PURPOSES OF THE TREATMENT:
        Legitimation Purposes Legitimate interest of the controller Provision of
        the necessary services for the care or training management requested by
        the Interested Party. Communications by email or other means. Training
        and maintenance of training history. Administrative management of family
        members/guardians. Management, where appropriate, of data specially
        protected in the interest of the applicant. Consent of the Data Subject
        External health services, psycho-pedagogical guidance, etc. Leisure and
        training activities. Sending communications related to the activity of
        the person in charge. Image and video processing SPECIFIC PROCESSING
        AUTHORIZATIONS: The Interested Party authorizes the processing of data
        listed below, consisting of: ● Execution of the necessary steps for the
        provision of the assistance or training service demanded by the
        Interested Party. ● Maintain a history of users and send subsequent
        communications. ● If necessary, receive external guidance or training
        services. ● Communication of data to third parties, provided that this
        communication is necessary for the management of the services demanded
        by the Interested Party, or their participation in leisure or training
        activities taught or not by the person in charge. ● Recording of images
        or videos in activities carried out by the person in charge.
        COMMUNICATION OF THE DATA: The data may be communicated to third parties
        when it is strictly necessary to achieve the purposes of the treatment
        or there is a legal obligation to make such communication. DATA
        CONSERVATION CRITERIA: They will be kept for the time necessary to
        achieve the purposes of the treatment and when they are no longer
        necessary, they will be deleted with adequate security measures to
        guarantee the pseudonymization of the data or the total destruction
        thereof. RIGHTS OF THE INTERESTED PARTY: ● Right to withdraw consent at
        any time. ● Right of access, rectification, portability and deletion of
        your data and the limitation or opposition to its treatment. ● Right to
        file a claim with the Control Authority (www.aepd.es) if you consider
        that the treatment does not comply with current regulations. CONTACT
        INFORMATION TO EXERCISE RIGHTS: SOCIAL AND CULTURAL ASSOCIATION CASA DE
        PAZ. C/ LOS ANDALUCES, N.º 22, POSTERIOR-BAJO., - 28038 MADRID (Madrid).
        Email: casadepaz01@yahoo.es The Interested Party consents to the
        processing of their data in the terms set out: Name........
        conNIF/NIE/PASSPORT......................... Legal representative
        of............ Company: ASOCIATION SOCIAL AND C ULTURAL 'CASA DE PAZ' C/
        Andaluces, 22 Posterior. CP: 28038 - MADRID Tel. and Fax: +34 91 380 27
        21 CIF: G-80366909 Email: casadepaz01@yahoo.es
      </Text>
      <Checkbox label="I agree to terms and condition."  styles={{input:classes.checkBoxInput}} mt={"md"}/>
    </Container>
  );
};
