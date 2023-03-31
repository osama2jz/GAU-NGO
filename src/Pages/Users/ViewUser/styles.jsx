import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  addUser: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    minHeight: "84vh",
  },
  innerContainer: {
    backgroundColor: theme.colors.white,
    padding: "20px",
    borderRadius: "20px",
    borderRadius: "10px",
    width: "100%",
    marginTop: "20px",
  },
  dp: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
