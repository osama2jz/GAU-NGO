import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  addUser: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    minHeight: "84vh",
  },
  innerContainer: {
    // border:'1px solid rgb(0,0,0,0.1)',
    borderRadius: "10px",
    width: "100%",
  },
  heading: {
    color: theme.colors.heading,
  },
  avatar: {
    // backgroundColor:'red',
    marginRight: "10px",
  },
  textheading: {
    fontSize: "14.5px",
    fontWeight: "bold",
    color: "greyDark",
  },
  textContent: {
    fontSize: "14.5px",
    fontWeight: 500,
    color: "#373A40",
  },
}));
