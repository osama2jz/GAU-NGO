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
  sign:{
    border:'1px solid rgb(0,0,0,0.3)',
    borderRadius:'10px',
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-end',
    backgroundColor:'rgb(0,0,0,0.05)'
  },
  subHeading: {
    fontSize: "18px",
    padding: "10px",
    marginBottom: "3px",
    textAlign: "center",
    fontWeight: "bold",
  },
  faceid: {
    // height: "200px",
    marginTop: "20px",
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
    backgroundColor: theme.colors.gray,
  },
  activeSep: {
    backgroundColor: theme.colors.green,
    height: "5px",
  },
  stepIcon: {
    "&[data-progress='true']": {
      border:`3px solid ${theme.colors.red}` 
    },
  },
  stepCompletedIcon: {
    borderRadius:'50%',
    color:theme.colors.white
  },
  userInput: {
    justifyContent: "center",
    alignItems: "center",
  },
}));
