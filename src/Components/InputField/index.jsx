import { createStyles, TextInput } from "@mantine/core";

const useStyles = createStyles((theme, { borderWhite }) => ({
 input: {
  backgroundColor: "transparent",
  border: borderWhite ? "1px solid rgb(255, 255, 255, 0.2)" : "1px solid rgb(0, 0, 0, 0.1)",
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

const InputField = ({
 placeholder,
 leftIcon,
 required,
 type = "text",
 label,
 pb = "sm",
 borderWhite,
 onChange,
 form,
 size = "md",
 validateName,
}) => {
 const { classes, cx } = useStyles({ borderWhite });
 return (
  <TextInput
   withAsterisk={required ? true : false}
   label={label}
   pb={pb}
   type={type}
   size={size}
   onChange={onChange}
   {...form?.getInputProps(validateName)}
   icon={leftIcon ? <img src={new URL(`../../assets/${leftIcon}.svg`, import.meta.url).href} alt="icon" /> : ""}
   classNames={{
    input: classes.input,
    visibilityToggle: classes.icon,
    label: classes.label,
   }}
   placeholder={placeholder}
  />
 );
};
export default InputField;
