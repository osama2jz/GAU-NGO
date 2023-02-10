import React from "react";
import SelectMenu from "../../../../Components/SelectMenu";

const Step1 = () => {
 return (
  <SelectMenu
   placeholder="Filter by Status"
   data={[
    { label: "verified", value: "verified" },
    { label: "Pending", value: "pending" },
   ]}
  />
 );
};

export default Step1;
