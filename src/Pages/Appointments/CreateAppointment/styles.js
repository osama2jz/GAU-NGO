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
  steps: {
    width: "50%",
    margin:'auto'
  },
  tab: {
    marginTop: "50px",
  },
  seperator: {
    color: "yellow",
    backgroundColor: theme.colors.gray,
  },
  activeSep: {
    backgroundColor: theme.colors.green,
    height: "5px",
    color: "yellow",
  },
  stepIcon: {
    "&[data-progress='true']": {
      border: `3px solid ${theme.colors.red}`,
    },
  },
  stepCompletedIcon: {
    border: `2px solid ${theme.colors.green}`,
    borderRadius: "50%",
    color: theme.colors.green,
  },
  //   tabList: {
  //     borderBottom: "1px solid gray",
  //   },
  tabs: {
    backgroundColor: "rgb(0,0,0,0.1)",
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
  avatar: {
    marginRight: "10px",
  },
  textheading: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "greyDark",
  },
  textContent: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#373A40",
  },
}));
