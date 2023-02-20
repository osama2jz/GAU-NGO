import { createStyles } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import moment from "moment";
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
  placeholder = "Select Date",
  icon,
  required,
  label,
  pb = "sm",
  borderWhite,
  excludeDate,
  size = "md",
  form,
  dropdownType="popover",
  validateName,
  labelFormat,
}) => {
  const { classes, cx } = useStyles({ borderWhite });
  return (
    <DatePicker
      size={size}
      icon={icon}
      clearable={false}
      dropdownType={dropdownType}
      placeholder={placeholder}
      label={label}
      excludeDate={(date)=>!excludeDate.includes(moment(date).format("YYYY-MM-DD"))}
      required={required}
      classNames={{ input: classes.root }}
      {...form?.getInputProps(validateName)}
      inputFormat={labelFormat}
    />
  );
};
export default Datepicker;
