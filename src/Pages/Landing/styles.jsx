import { createStyles } from "@mantine/core";
import landingBg from "../../assets/landingBg.svg";
import g2 from "../../assets/g2.svg";
import footer from "../../assets/landingFooter.svg";
export const useStyles = createStyles((theme) => ({
  top: {
    minHeight: "95vh",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    backgroundImage: `url(${landingBg})`,
    color: "white",

    [`@media (max-width: 820px)`]: {
      backgroundPosition: "right",
      marginBottom: "20px",
    },
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize:'12px',
    whiteSpace:'nowrap'
  },
  service: {
    position:'relative',
    border: "1px solid rgb(0,0,0,0.2)",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "5px 5px 15px rgb(0,0,0,0.2)",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "5px 5px 5px #E8E8E8",
    },
  },
  tag: {
    position: "absolute",
    right:15,
    top:15
  },
  services: {
    marginBottom: "70px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid rgb(0,0,0,0.4)",
    borderRadius: "20px",
    backgroundColor: "white",
    height: "170px",
    width: "150px",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "5px 5px 5px #E8E8E8",
    },
    [`@media (max-width: 820px)`]: {
      height: "130px",
      width: "100px",
    },
  },
  cat: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    border: "2px solid rgb(0,0,0,0.4)",
    borderRadius: "20px",
    backgroundColor: "white",
    height: "280px",
    width: "250px",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "5px 5px 15px rgb(0,0,0,0.2)",
    },
    [`@media (max-width: 820px)`]: {
      height: "220px",
      width: "150px",
    },
  },
  g2: {
    display: "flex",
    alignItems: "center",
    gap: "100px",
    padding: "50px 50px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundImage: `url(${g2})`,
    [`@media (max-width: 820px)`]: {
      padding: "20px 20px",
      gap: "10px",
      flexDirection: "column",
    },
  },
  mem: {
    display: "flex",
    paddingInline: "50px",
    gap: "100px",
    [`@media (max-width: 820px)`]: {
      paddingInline: "10px",
    },
  },
  footer: {
    display: "flex",
    alignItems: "center",
    padding: "50px",
    color: "white",
    justifyContent: "space-evenly",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${footer})`,
    [`@media (max-width: 820px)`]: {
      flexDirection: "column",
      gap: "20px",
      paddingTop: "90px",
    },
  },
}));
