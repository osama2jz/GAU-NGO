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
  placeholder,
  icon,
  required,
  label,
  pb = "sm",
  borderWhite,
  onChange,
  form,
  validateName,
}) => {
  const { classes, cx } = useStyles({ borderWhite });
  return (
    <TimeInput
      label={label}
      size="xs"
      placeholder="Pick time"
      format="12"
      icon={icon}
      defaultValue={new Date()}
      amLabel="am"
      pmLabel="pm"
      classNames={{ input: classes.root }}
      required={required}
      // clearable
    />
  );
};
export default Timepicker;
