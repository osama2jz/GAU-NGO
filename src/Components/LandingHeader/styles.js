import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme, { opened }) => ({
  logo: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontWeight: "500",
  },
  navigationBar: {
    [`@media (max-width: 820px)`]: {
      flexDirection: "column",
      position: "absolute",
      top: "80px",
      padding: "50px 20px",
      borderRadius: "10px",
      width: "100vw",
      right: 0,
      backgroundColor: "white",
      display: opened ? "flex" : "none",
    },
  },
}));
