import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  addUser: {
    backgroundColor: theme.colors.gray,
    borderRadius: "15px",
    padding: "20px",
    width:'100%',
    height: "100%",
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
  skip: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent:'center',
  },
}));
