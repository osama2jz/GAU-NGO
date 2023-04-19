import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    width: "100%",
    minHeight: "84vh",
  },
  innerContainer:{
    backgroundColor: theme.colors.white,
    padding: "20px",
    borderRadius: "20px",
    width: "100%",
    marginTop: "20px",
  },
  heading: {
    color: theme.colors.heading,
  },
  export: {
    border: `2px solid ${theme.colors.gray}`,
    padding: "5px",
    borderRadius: "5px",
    width: "150px",
    marginLeft: "auto",
    ':hover':{
      cursor:'pointer',
      border:`1px solid ${theme.colors.primary}`
    }
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
