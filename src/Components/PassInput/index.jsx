import { createStyles, PasswordInput } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  input: {
    backgroundColor: "transparent",
    color: "red",
    border: "1px solid rgb(0, 0, 0, 0.1)",
  },
}));

const PassInput = ({
  placeholder,
  leftIcon,
  label,
  required,
  pb = "sm",
  form,
  validateName,
}) => {
  const { classes, cx } = useStyles();
  return (
    <PasswordInput
      pb={pb}
      size="md"
      withAsterisk={required ? true : false}
      label={label}
      {...form?.getInputProps(validateName)}
      icon={
        leftIcon ? (
          <img src={require(`../../assets/${leftIcon}.svg`)} alt="icon" />
        ) : (
          ""
        )
      }
      classNames={{ input: classes.input }}
      placeholder={placeholder}
    />
  );
};
export default PassInput;
