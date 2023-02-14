import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    width: "100%",
    height: "100%",
  } ,
  back:{
    marginRight:'auto',
    display:'flex',
    alignItems:'center'
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
