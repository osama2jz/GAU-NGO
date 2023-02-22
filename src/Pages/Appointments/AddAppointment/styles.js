import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  addAppointment: {
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
  tab: {
    marginTop: "50px",
  },
//   tabList: {
//     borderBottom: "1px solid gray",
//   },
  tabs:{
    backgroundColor:'rgb(0,0,0,0.1)'
  },
  stepIcon: {
    // border:'1px solid black',
    //   borderRadius: "50%",
  },
  subHeading: {
    fontSize: "18px",
    marginBottom: "3px",
    textAlign: "center",
    fontWeight: "bold",
  },
  consent: {},
  checkBoxInput: {
    border: "1px solid gray",
  },
  verified: {},
  check: {
    border: "2px solid green",
  },
  image: {
    width: "200px",
  },
  testCol: {
    border: "2px solid black",
  },
  testGrid: {
    border: "2px solid red",
  },
}));
