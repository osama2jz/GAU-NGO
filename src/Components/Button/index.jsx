import { Button as ButtonMantine, createStyles } from "@mantine/core";

const useStyles = createStyles((theme, { bg, primary, disabled }) => ({
  rootPrimary: {
    backgroundColor: primary
      ? theme.colors.green
      : bg
      ? theme.colors.blue
      : theme.colors.red,
    "&:hover": {
      backgroundColor: primary
        ? theme.colors.greenHover
        : bg
        ? theme.colors.blueHover
        : theme.colors.redHover,
    },
  },
  disabled: {
    backgroundColor: primary
      ? theme.colors.greenHover
      : bg
      ? theme.colors.blueHover
      : theme.colors.redHover,
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
  bg = false,
  primary = false,
  styles,
  onClick,
  compact,
  type,
  iconWidth = "16px",
  disabled,
  // white=false
}) => {
  const { classes, cx } = useStyles({ bg, primary, disabled });
  return (
    <ButtonMantine
      sx={styles}
      compact={compact}
      disabled={disabled}
      leftIcon={
        leftIcon ? (
          <img
            src={new URL(`../../assets/${leftIcon}.svg`, import.meta.url).href}
            alt="icon"
            width={iconWidth}
          />
        ) : (
          ""
        )
      }
      type={type}
      classNames={{
        root: disabled ? classes.disabled : classes.rootPrimary,
      }}
      onClick={onClick}
    >
      {label}
    </ButtonMantine>
  );
};
export default Button;
