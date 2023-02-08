import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  addUser: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    width:'100%',
    minHeight: "84vh",
  },
  form: {
    margin: "auto",
    width: "70%",
    marginTop: "50px",
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
}));
