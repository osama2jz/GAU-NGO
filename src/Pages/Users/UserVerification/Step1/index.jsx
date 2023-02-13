import { Container } from "@mantine/core";
import { useEffect } from "react";
import { useStyles } from "../styles";

export const Step1 = () => {
  const { classes } = useStyles();
  let faceio;

  useEffect(() => {
    console.log(window)
    // faceio = new window.faceIO("Your Public ID goes here");
    console.log(faceio);
  }, []);
  return <Container size="xl"></Container>;
};
