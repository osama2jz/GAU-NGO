import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  addUser: {
    // backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    width:'100%',
    minHeight: "84vh",
    height: "100%",
    // border: `0.5px solid rgb(0,0,0,0.1)`,
  },
  form: {
    margin: "auto",
    backgroundColor:theme.colors.white,
    padding:'30px',
    borderRadius:'20px',
    width: "98%",
    marginTop: "20px",
  },
  modal: {
    textAlign: "center",
    width:'90%'
  },
  heading:{
    color:theme.colors.heading
  },
  skip: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent:'center',
  },
  tabs: {
    backgroundColor: "rgb(0,0,0,0.1)",
  },
}));
