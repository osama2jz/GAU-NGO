import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
    main: {
        backgroundColor: theme.colors.container,
        borderRadius: "15px",
        padding: "20px",
        width: "100%",
        minHeight: "84vh",
      },
      heading:{
        color:theme.colors.heading
      },
      export:{
        border: `2px solid ${theme.colors.gray}`,
        padding: "5px",
        borderRadius: "5px",
        width: "100px",
        marginLeft:'auto'
        
      }
}));