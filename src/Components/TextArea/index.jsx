import { createStyles, Textarea as TextareaMantine } from "@mantine/core";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

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
  rows = "3",
  validateName,
  value,
  readOnly = false,
  ...props
}) => {
  const { classes, cx } = useStyles({ borderWhite });
  const { translate } = useContext(UserContext);
  return (
    <TextareaMantine
      withAsterisk={required ? true : false}
      label={translate(label)}
      pb={pb}
      minRows={rows}
      size={size}
      readOnly={readOnly}
      onChange={onChange}
      {...form?.getInputProps(validateName)}
      classNames={{
        input: classes.input,
        label: classes.label,
      }}
      placeholder={translate(placeholder)}
      rows={rows}
      {...props}
    />
  );
};
export default TextArea;
