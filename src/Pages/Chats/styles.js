import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme, props) => ({
  chatsMain: {
    minHeight: "84vh",
  },
  subChat: {
    display: "flex",
    height: "100% !important",
    border: "1px solid rgb(0,0,0,0.3)",
    padding: "15px",
    borderRadius: "15px",
    backgroundColor: "white",
  },
  chatHead: {
    borderBottom: "1px solid rgb(0,0,0,0.3)",
    cursor: "pointer",
    padding: "5px",
    borderRadius: "2px",
    backgroundColor: props?.isActive ? theme.colors.blue : "white",
    color: props?.isActive ? "white" : "",
    ":last-of-type": {
      border: "none",
    },
    ":hover": {
      opacity: 0.7,
    },
  },
  chats: {
    padding: "5px",
    width: "350px",
    // borderRight: "1px solid rgb(0,0,0,0.3)",
  },
  chat: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
  messageMain: {
    display: "flex",
    gap: "5px",
    flexDirection: props?.type === "sent" ? "row-reverse" : "row",
  },
  message: {
    backgroundColor:
      props?.type === "sent" ? theme.colors.green : "rgb(0,0,0,0.1)",
    maxWidth: "70%",
    color: props?.type === "sent" ? "white" : "black",
    marginBottom: "10px",
    borderRadius: "5px",
    padding: "10px",
    marginLeft: props?.type === "sent" ? "auto" : "",
    position: "relative",
  },
  chatInfo: {
    borderBottom: "1px solid rgb(0,0,0,0.3)",
    marginBottom: "5px",
  },
  noChat: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "gray",
  },
}));
