import { Group, Text } from "@mantine/core";

export const texts = [
  { key: "Full Name", value: "Muhammad Usama" },
  { key: "Passport", value: "FN23344324" },
  { key: "Date of Birth", value: "12 Nov 1997" },
  { key: "Nationality", value: "Spanish" },
  { key: "Origin", value: "Pakistan" },
  { key: "Age", value: "40" },
  { key: "Domicile", value: "Pakistan" },
  { key: "Municipality", value: "Municipality" },
].map((obj, key) => {
  return (
    <>
      <Text fz={16} fw={"bold"}>
        {obj.key}
      </Text>
      <Text opacity={"40%"} fz={16} fw={"bold"}>
        {obj.value}
      </Text>
    </>
  );
});
