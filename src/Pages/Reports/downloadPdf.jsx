import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import download from "../../assets/download.svg";
import { Flex, Image, Menu, Text } from "@mantine/core";
import { useStyles } from "./Private/styles";
import moment from "moment";

function DownloadPdf({ headCells, data, title }) {
  const { classes } = useStyles();
  // console.log("HEADCELLS: ", headCells)
  // console.log("DATA: ", data)
  // console.log("TITLE: ", title)
  const today = moment();
  // console.log(today.format("DD-MMM-YYYY"));
  const [filteredData, setFilteredData] = React.useState();
  const [filteredDataMonthly, setFilteredDataMonthly] = React.useState();
  //  console.log("FILTERED DATA: ", filteredData)

  const filteredDaily = data.filter(
    (person) => person.date === today.format("DD-MMM-YYYY")
  );
  const filteredWeekly = data.filter(
    (person) => person.date === today.format("DD-MMM-YYYY")
  );
  const filteredMonthly = data.filter(
    (person) => person.date.substr(3, 3) === today.format("MMM")
  );

  const filter = (name) => {
    if (name === "daily") {
      filteredDaily.map((person) => console.log(person));
      setFilteredData(filteredDaily);
      {
        filteredData && downloadPDF(filteredData, "Daily Reports");
      }
    }
    if (name === "weekly") {
      return filteredWeekly.map((person) => console.log(person));
    }
    if (name === "monthly") {
      filteredMonthly.map((person) => console.log(person));
      setFilteredDataMonthly(filteredMonthly);
      {
        filteredDataMonthly && downloadPDF(filteredData, "Monthly Reports");
      }
    }
  };
  const downloadPDF = (filteredData, title) => {
    const doc = new jsPDF({ orientation: "l" });

    doc.text(title, 13, 10);

    doc.autoTable({
      theme: "grid",
      cellWidth: "auto",
      halign: "left",
      rowPageBreak: "avoid",
      tableWidth: "auto",

      columns: headCells.map((col) => {
        console.log("PDF DONWLOADER: ", col);
        return {
          dataKey: col.id,
          header: col.label,
        };
      }),
      body:
        filteredData &&
        filteredData.map((dataPoint) => {
          console.log("DATA_POINT: ", dataPoint);
          return dataPoint;
        }),
    });

    doc.save(`${title}.pdf`);
  };

  return (
    <Menu shadow="md" width={"target"} className={classes.export}>
      <Menu.Target>
        <Flex gap={4} align="center" justify={"space-around"}>
          <Image src={download} width={18} height={18} />
          <Text>Export PDF</Text>
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => filter("daily")}>Daily</Menu.Item>
        <Menu.Item onClick={() => filter("weekly")}>Weekly</Menu.Item>
        <Menu.Item onClick={() => filter("monthly")}>Monthly</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default DownloadPdf;
