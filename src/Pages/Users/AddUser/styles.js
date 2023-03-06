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
  imageContainer: {
    display: "flex",
    width: "220px",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    backgroundColor:"red.0"
  },
  cross: {
    position: "absolute",
    right: "0px",
    // bottom: "0px",
    zIndex: 2,
    backgroundColor: "white",
    borderRadius: "50%",
    ":hover": {
      cursor: "pointer",
      scale: "1.1",
    },
  },
  upload: {
    border: "1px solid gray",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
