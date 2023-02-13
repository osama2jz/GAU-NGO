import { Container } from "@mantine/core";
import { useEffect } from "react";
import Button from "../../../../Components/Button";
import { useStyles } from "../styles";

export const Step1 = () => {
  const { classes } = useStyles();
  let faceio;

  useEffect(() => {
    faceio = new faceIO("fioae1c0");
    console.log("asdad", faceio);
  }, []);

  const handleVerifyID = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "example@gmail.com",
          pin: "12345",
        },
      });

      console.log(` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container size="xl" w={"100%"} className={classes.faceid}>
      <Button
        label={"Verify Face ID"}
        leftIcon="faceid"
        iconWidth="24px"
        styles={{ width: "500px", height: "100px", fontSize:'24px'}}
        onClick={handleVerifyID}
      />
    </Container>
  );
};
