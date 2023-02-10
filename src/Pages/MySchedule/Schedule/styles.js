import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    width: "100%",
    minHeight: "84vh",
  },
  cal:{
    border: `1px solid ${theme.colors.gray}`,
    backgroundColor: theme.colors.gray,
  },
  heading:{
    color:theme.colors.heading
  },
 
}));
