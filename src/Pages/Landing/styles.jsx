import { createStyles } from "@mantine/core";
import landingBg from "../../assets/landingBg.svg";
export const useStyles = createStyles((theme) => ({
  top: {
    minHeight: "95vh",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    backgroundImage: `url(${landingBg})`,
    color:'white'
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:'center',
    border: "2px solid rgb(0,0,0,0.4)",
    borderRadius:'20px',
    backgroundColor:'white',
    height:'170px',
    width:'170px'
  },
}));
