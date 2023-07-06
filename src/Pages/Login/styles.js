import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
  },
  form: {
    margin: "auto",
    overflowY: "scroll",
    overflowX:"hidden",
    width: "70%",
    [`@media (max-width: 600px)`]: {
      width: "90%",
    },
  },
  formC: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    gap: "5px",
    [`@media (max-width: 600px)`]: {
      background: "rgb(255, 255, 255, 0.6) url(/src/assets/login.png)",
      backgroundPosition: "bottom",
      backgroundBlendMode: "lighten",
      backgroundSize: "350px",
      backgroundRepeat: "no-repeat",
    },
  },
  img: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxInput: {
    border: "1px solid rgb(0,0,0,0.5)",
  },
}));
