import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  main: {
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
  cal: {
    border: `1px solid ${theme.colors.gray}`,
    // backgroundColor: "gray",
    borderRadius:'10px',
    // width:'100%',
    boxShadow:'00px 0px 20px 5px rgb(0,0,0,0.1)'
  },
  heading: {
    color: theme.colors.heading,
  },
}));
