import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    width: "100%",
    height: "100%",
  },
  back:{
    marginRight:'auto',
    display:'flex',
    alignItems:'center'
  }
 
}));
