import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  addUser: {
    backgroundColor: theme.colors.container,
    borderRadius: "15px",
    padding: "20px",
    minHeight: "84vh",
  },
  innerContainer: {
    backgroundColor: theme.colors.white,
    padding: "20px",
    borderRadius: "20px",
    width: "95%",
    marginTop: "20px",

  },
  dp: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  socio: {
    border: "1px solid #E9ECEF",
    height: "55%",
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
  },
  textheading: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "greyDark",
  },
  textContent: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#373A40",
    marginLeft: '20px'
  },
  back: {
    marginRight: "auto",
    display: "flex",
    alignItems: "center",
  },
  sign: {
    border: '1px solid rgb(0,0,0,0.3)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgb(0,0,0,0.05)',
    padding: '30px',

  },
  tabs: {
    backgroundColor: "white",
    fontSize: "15px",
  },

}));
