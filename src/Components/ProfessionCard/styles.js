import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
    card: {
        border: `0.5px solid rgb(0,0,0,0.1)`,
        // borderColor:"#1864AB",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    badge:{
        marginLeft:'auto'
    },
    button:{
        width:"100%",
    },
    img:{
        border:"3px solid green",
        // padding:'2px'
        marginTop:'4px'
    }
}));
