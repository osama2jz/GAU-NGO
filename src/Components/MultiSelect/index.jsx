import { createStyles, MultiSelect as Select } from "@mantine/core";
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

const MultiSelect = ({
  placeholder,
  leftIcon,
  searchable,
  required,
  label,
  pb = "sm  ",
  data,
  setData,
  clearable,
  borderWhite,
  onChange,
  disabled,
  creatable,
  form,
  value,
  size = "md",
  validateName,
  itemComponent,
  ...props
}) => {
  const {translate}=useContext(UserContext)
  const { classes, cx } = useStyles({ borderWhite });
  return (
    <Select
      searchable={searchable}
      withAsterisk={required ? true : false}
      label={translate(label)}
      pb={pb}
      defaultValue={value}
      itemComponent={itemComponent}
      size={size}
      getCreateLabel={(query) => `+ Create ${query}`}
      creatable={creatable}
      clearable={clearable}
      disabled={disabled}
      onChange={onChange || ((v) => setData(v))}
      data={data}
      {...form?.getInputProps(validateName)}
      icon={
        leftIcon ? (
          <img src={require(`../../assets/${leftIcon}.svg`)} alt="icon" />
        ) : (
          ""
        )
      }
      classNames={{
        input: classes.input,
        visibilityToggle: classes.icon,
        label: classes.label,
      }}
      placeholder={translate(placeholder)}
      {...props}
    />
  );
};
export default MultiSelect;
