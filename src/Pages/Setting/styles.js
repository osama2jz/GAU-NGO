import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
    main: {
        backgroundColor: theme.colors.container,
        borderRadius: "15px",
        padding: "20px",
        width: '100%',
        minHeight: "84vh",
    },
    heading:{
        color:theme.colors.heading
      },
    container: {
        padding: "20px",
    },
    upload: {
        border: "1px solid gray",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    }
}));