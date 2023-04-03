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
  heading: {
    color: theme.colors.heading,
  },
  container: {
    padding: "20px",
  },
  tabs: {
    backgroundColor: "rgb(0,0,0,0.1)",
    "&:hover": {
      backgroundColor: theme.colors.blue[1],
    },
  },
  image: {
    border: "1px solid rgb(0,0,0,0.2)",
    padding: "2px",
  },
  imageContainer: {
    display: "flex",
    width: "220px",
    justifyContent: "center",
  },
  cross: {
    position: "absolute",
    right: "0px",
    // bottom: "0px",
    zIndex: 2,
    backgroundColor: "white",
    borderRadius: "50%",
    ":hover": {
      cursor: "pointer",
      scale: "1.1",
    },
  },
  upload: {
    border: "1px solid gray",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
