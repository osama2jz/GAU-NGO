import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  card: {
    //   position: 'relative',
    // cursor: 'pointer',
    //   overflow: 'hidden',
    transition: 'transform 150ms ease, box-shadow 100ms ease',
    //   padding: theme.spacing.xl,
    //   paddingLeft: theme.spacing.xl * 2,
    border: `1px solid ${theme.colors.grayDark}`,

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.02)',
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundImage: theme.fn.linearGradient(0, theme.colors.blue, theme.colors.red),
    },
  },
  badge: {
    marginLeft: "auto",
   
  },
}));