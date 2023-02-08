import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    width: "100%",
    height: "100%",
  },
  left: {
    borderRadius: "15px",
    // padding: "20px",
    width: "100%",
    height: "100%",
  },
  card: {
    border: `1px solid ${theme.colors.gray}`,
  },
}));
