import { createStyles } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
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

const Datepicker = ({
  placeholder,
  icon,
  required,
  label,
  pb = "sm",
  borderWhite,
  onChange,
  form,
  validateName,
  labelFormat,
}) => {
  const { classes, cx } = useStyles({ borderWhite });
  return (
    <DatePicker
      size="xs"
      icon={icon}
      clearable={false}
      dropdownType="modal"
      placeholder="Pick date"
      label={label}
      required={required}
      classNames={{ input: classes.root }}
      inputFormat={labelFormat}
    />
  );
};
export default Datepicker;
