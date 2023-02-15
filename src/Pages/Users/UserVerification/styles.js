import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  userVerification: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    width: "100%",
    minHeight: "84vh",
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
  userInput: {
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
   },
}));
