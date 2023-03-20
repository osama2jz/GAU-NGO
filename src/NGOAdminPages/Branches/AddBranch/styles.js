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
    backgroundColor: theme.colors.white,
    padding: "30px 0px 30px 0px",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "20px",
    [`@media (max-width: 620px)`]: {
      flexDirection: "column",
    },
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
  dp: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  upload: {
    border: "1px solid gray",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
