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
  onChange,
  maxDate,
  minDate,
 
  
}) => {
  const { classes, cx } = useStyles({ borderWhite });
  const disabledDays = {
    daysOfWeek: [0], // Sunday is represented by 0
  };
  return (
    <DatePicker
      size={size}
      icon={icon}
      maxDate={maxDate}
      minDate={minDate}
      clearable={false}
      dropdownType={dropdownType}
      placeholder={placeholder}
      label={label}
      excludeDate={(date)=>excludeDate && !excludeDate?.includes(moment(date).format("YYYY-MM-DD"))}
      required={required}
      onChange={onChange}
      classNames={{ input: classes.root }}
      {...form?.getInputProps(validateName)}
      inputFormat={labelFormat}
      disabledDays={disabledDays}
    />
  );
};
export default Datepicker;
