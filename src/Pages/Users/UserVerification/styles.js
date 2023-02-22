import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  userVerification: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    width: "100%",
    minHeight: "84vh",
  },
  innerContainer: {
    backgroundColor: theme.colors.white,
    padding: "20px",
    borderRadius: "20px",
    width: "100%",
    marginTop: "20px",
  },
  stepIcon: {
    // border:'1px solid black',
    borderRadius: "50%",
  },
  subHeading: {
    fontSize: "18px",
    padding: "10px",
    marginBottom: "3px",
    textAlign: "center",
    fontWeight: "bold",
  },
  faceid: {
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  consent: {},
  checkBoxInput: {
    border: "1px solid gray",
  },
  verified: {},
  seperator: {
    color: "yellow",
    backgroundColor: theme.colors.red,
  },
  activeSep: {
    backgroundColor: theme.colors.green,
    height: "5px",
    color: "yellow",
  },
  stepCompletedIcon: {
    border: `2px solid ${theme.colors.green}`,
    borderRadius:'50%',
    color:theme.colors.green
  },
  userInput: {
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
