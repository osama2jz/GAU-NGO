import { createStyles, Select } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
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

const SelectMenu = ({
  placeholder,
  leftIcon,
  searchable,
  required,
  label,
  pb,
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
}) => {
  const { translate } = useContext(UserContext);
  const { classes, cx } = useStyles({ borderWhite });
  const [translatedData, setTranslatedData] = useState(data || []);
  useEffect(() => {
    let transaletd = data.map((obj) => {
      return { value: obj.value, label: translate(obj.label) };
    });
    setTranslatedData(transaletd);
  }, [data]);
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
      value={value}
      onChange={onChange || ((v) => setData(v))}
      data={translatedData}
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
    />
  );
};
export default SelectMenu;
