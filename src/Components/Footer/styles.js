import { createStyles } from "@mantine/core";
import footer from "../../assets/footer.jpg";
export const useStyles = createStyles((theme) => ({
  footer: {
    backgroundImage: `url(${footer})`,
    position: "relative",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    gap: "30px",
    backgroundPosition: "center",
    zIndex: 1,

    ":after": {
      content: '""',
      backgroundColor: "rgb(45, 62, 80, 0.8)",
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: -1,
      top: 0,
      left: 0,
    },
  },
  icon: {
    backgroundColor: theme.colors.green,
    padding: "10px",
    borderRadius: "35% 35% 0 35%",
  },
  socialIcon: {
    border: "1px solid white",
    borderRadius: "50%",
    padding: "4px",
  },
}));
