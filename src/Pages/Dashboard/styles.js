import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
    main:{
    backgroundColor: theme.colors.gray,
    borderRadius: "15px",
    padding: "20px",
    width:'100%',
    height: "100%",
    },
    left:{
        borderRadius: "15px",
        // padding: "20px",
        width:'100%',
        height: "100%",
    },
    card:{
        // backgroundColor: theme.colors.gray,
    }
}));