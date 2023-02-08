import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
    main: {
        backgroundColor: theme.colors.gray,
        borderRadius: "15px",
        padding: "20px",
        width: '100%',
        height: "100%",
    },
    container: {
        backgroundColor: "#F8F9FA",
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