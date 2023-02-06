import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  addUser: {
    backgroundColor: theme.colors.gray,
    borderRadius: "15px",
    padding: "20px",
    height: "100%",
  },
  form: {
    margin: "auto",
    width: "70%",
    marginTop: "50px",
  },
  table: {
    width: "90%",
    margin: "auto",
  },
}));
