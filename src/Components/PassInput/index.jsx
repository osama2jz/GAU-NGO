import { createStyles, PasswordInput } from "@mantine/core";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

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
  const {translate}=useContext(UserContext)
  return (
    <PasswordInput
      pb={pb}
      size="md"
      withAsterisk={required ? true : false}
      label={translate(label)}
      {...form?.getInputProps(validateName)}
      icon={
        leftIcon ? (
          <img src={new URL(`../../assets/${leftIcon}.svg`, import.meta.url).href} alt="icon" />
        ) : (
          ""
        )
      }
      classNames={{ input: classes.input }}
      placeholder={translate(placeholder)}
    />
  );
};
export default PassInput;
