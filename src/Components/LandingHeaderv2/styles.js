import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme, { opened }) => ({
  logo: {
    color: "white",
    "&:hover": {
      cursor: "pointer",
    },
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "600",
    [`@media (max-width: 1100px)`]: {
      color: "black",
    },
    "&:hover": {
      cursor: "pointer",
      scale: "1.1",
      textShadow: "2px 2px rgb(0,0,0,0.4)",
    },
  },
  navigationBar: {
    [`@media (max-width: 1100px)`]: {
      flexDirection: "column",
      position: "absolute",
      top: "80px",
      padding: "50px 20px",
      color: "black !important",
      borderRadius: "10px",
      width: "100vw",
      right: 0,
      backgroundColor: "white",
      display: opened ? "flex" : "none",
      zIndex: 11,
    },
  },
}));
