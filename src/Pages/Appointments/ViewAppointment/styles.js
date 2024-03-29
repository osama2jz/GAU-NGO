import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  addUser: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    minHeight: "84vh",
   
  },back: {
    marginRight: "auto",
    display: "flex",
    alignItems: "center",
  },
  heading: {
    color: theme.colors.heading,
  },
  tabs: {
    backgroundColor: "rgb(0,0,0,0.1)",
  },
  innerContainer: {
    backgroundColor: theme.colors.white,
    padding: "20px",
    borderRadius: "20px",
    width: "100%",
    marginTop: "20px",
  },
  avatar: {
    // backgroundColor:'red',
    // marginRight: "10px",
    display:'flex',
    justifyContent:'center !important',
  },
  textheading: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "greyDark",
  },
  textContent: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#373A40",
  },
}));
