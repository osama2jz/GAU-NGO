import { Button as ButtonMantine, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  rootPrimary: {
    backgroundColor: theme.colors.primary,
    "&:hover": {
      backgroundColor: theme.colors.primaryHover,
    },
  },
  rootSecondary: {
    backgroundColor: "transparent",
    color: "black",
    border: "1px solid rgb(0,0,0,0.3)",
    "&:hover": {
      backgroundColor: theme.colors.gray,
    },
  },
  icon: {
    "&:hover": {
      backgroundColor: "red",
    },
  },
}));

const Button = ({
  leftIcon,
  label,
  primary = false,
  styles,
  onClick,
  compact,
  type,
}) => {
  const { classes, cx } = useStyles();
  return (
    <ButtonMantine
      sx={styles}
      compact={compact}
      type={type}
      classNames={{
        root: primary ? classes.rootPrimary : classes.rootSecondary,
      }}
      onClick={onClick}
    >
      {label}
    </ButtonMantine>
  );
};
export default Button;
