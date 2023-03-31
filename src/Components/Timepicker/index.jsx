import { createStyles } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
const useStyles = createStyles((theme, { borderWhite }) => ({
  root: {
    backgroundColor: "transparent",
    border: borderWhite
      ? "1px solid rgb(255, 255, 255, 0.2)"
      : "1px solid rgb(0, 0, 0, 0.1)",
    color: borderWhite ? "white !important" : "black !important",
    borderRadius: "5px",
  },
}));

const Timepicker = ({
  icon,
  required,
  label,
  pb = "sm",
  borderWhite,
  form,
  size = "md",
  validateName,
  value,
}) => {
  const { classes, cx } = useStyles({ borderWhite });
  return (
    <TimeInput
      label={label}
      size={size}
      placeholder="Pick time"
      icon={icon}
      format="24"
      classNames={{ input: classes.root }}
      required={required}
      {...form?.getInputProps(validateName)}
    />
  );
};
export default Timepicker;
