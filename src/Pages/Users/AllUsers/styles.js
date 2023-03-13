import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  addUser: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    minHeight: "84vh",
  },
  innerContainer: {
    backgroundColor:theme.colors.white,
    padding:'20px',
    borderRadius:'20px',
    borderRadius: "10px",
    width: "100%",
    marginTop: "20px",

  },
  heading: {
    color: theme.colors.heading,
  },
  avatar: {
    marginRight: "10px",
  },
  textheading: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "greyDark",
  },
  textContent: {
    fontSize: "14.5px",
    fontWeight: 500,
    color: "#373A40",
    marginLeft:'20px'
  },
}));
