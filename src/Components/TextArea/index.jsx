import { createStyles, Textarea as TextareaMantine } from "@mantine/core";

const useStyles = createStyles((theme, { borderWhite }) => ({
  input: {
    backgroundColor: "transparent",
    border: borderWhite
      ? "1px solid rgb(255, 255, 255, 0.2)"
      : "1px solid rgb(0, 0, 0, 0.1)",
    color: borderWhite ? "white !important" : "black !important",
    borderRadius: "5px",
  },
  label: {
    // fontSize:'16px'
  },
  icon: {
    "&:hover": {},
  },
}));

const TextArea = ({
  placeholder,
  required,
  label,
  pb = "sm",
  borderWhite,
  onChange,
  form,
  size = "md",
  rows="3",
  validateName,
  value,
}) => {
  const { classes, cx } = useStyles({ borderWhite });
  return (
    <TextareaMantine
      withAsterisk={required ? true : false}
      label={label}
      pb={pb}
      minRows={rows}
      size={size}
      onChange={onChange}
      {...form?.getInputProps(validateName)}
      classNames={{
        input: classes.input,
        label: classes.label,
      }}
      placeholder={placeholder}
      value={value}
      rows={rows}
    />
  );
};
export default TextArea;
