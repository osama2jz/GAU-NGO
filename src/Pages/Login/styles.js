import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
  },
  form: {
    margin: "auto",
    width: "50%",
    // display:'flex',
    // flexDirection:'column',
    // backgroundColor:'red'
  },
  formC: {
    display: "flex",
    flexDirection:'column',
    justifyContent: "center",
    // alignItems: "center",
    gap: "5px",
  },
  img: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxInput: {
    border: "1px solid rgb(0,0,0,0.2)",
  },
}));
