import { createStyles, Select } from "@mantine/core";

const useStyles = createStyles((theme, { borderWhite }) => ({
  input: {
    backgroundColor: "transparent",
    border: borderWhite
      ? "1px solid rgb(255, 255, 255, 0.2)"
      : "1px solid rgb(0, 0, 0, 0.1)",
    color: borderWhite ? "white !important" : "black !important",
    borderRadius: "5px",
  },
  label:{
    // fontSize:'16px'
  },
  icon: {
    "&:hover": {},
  },
}));

const SelectMenu = ({
  placeholder,
  leftIcon,
  required,
  label,
  pb = "sm  ",
  data,
  borderWhite,
  onChange,
  form,
  validateName,
}) => {
  const { classes, cx } = useStyles({ borderWhite });
  return (
    <Select
      withAsterisk={required ? true : false}
      label={label}
      pb={pb}
      size="md"
      onChange={onChange}
      data={data}
      {...form?.getInputProps(validateName)}
      icon={
        leftIcon ? (
          <img src={require(`../../assets/${leftIcon}.svg`)} alt="icon" />
        ) : (
          ""
        )
      }
      classNames={{ input: classes.input, visibilityToggle: classes.icon, label:classes.label }}
      placeholder={placeholder}
    />
  );
};
export default SelectMenu;
