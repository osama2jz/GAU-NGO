import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import download from "../../assets/download.svg";
import { Flex, Image, Menu, Text } from "@mantine/core";
import { useStyles } from "./Private/styles";
import moment from "moment";
import { showNotification } from "@mantine/notifications";

function DownloadPdf({ headCells, data, title ,setdata}) {
  const { classes } = useStyles();

// console.log("data", data);
  const today = moment();
  const oneWeekAgo = moment().subtract(7, "days");

  const filteredDaily = data?.filter(
    (person) => person.date === today.format("DD-MMM-YYYY")
  );

  const filteredWeekly = data?.filter((person) => {
    return (
      new Date(person.date) >= new Date(oneWeekAgo) &&
      new Date(person.date) <= new Date(today)
    );
  });
  const filteredMonthly = data?.filter((person) => person.date.substr(3, 3) === today.format("MMM")
  );

  const filter = (name) => {
    // if(name === "all") {
    //   downloadPDF(filteredDaily, "Daily Reports")
    // }
    if (name === "daily") {
      filteredDaily.length === 0
        ? showNotification({
            title: "No Data",
            message: "No Reports for today",
            color: "green.0",
          })
        : downloadPDF(filteredDaily, "Daily Reports");
    }
    if (name === "weekly") {
      filteredWeekly.length === 0
        ? showNotification({
            title: "No Data",
            message: "No Reports for the week",
            color: "green.0",
          })
        : downloadPDF(filteredWeekly, "Weekly Reports");
    }
    if (name === "monthly") {
      filteredMonthly.length === 0
        ? showNotification({
            title: "No Data",
            message: "No Reports for the Month",
            color: "green.0",
          })
        : downloadPDF(filteredMonthly, "Monthly Reports");
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
     

      columns: headCells.slice(0,-1).map((col) => {
        return {
          dataKey: col.id,
          header: col.label,
        };
      }),
      body:
        filteredData &&
        filteredData.map((dataPoint) => {
          return dataPoint;
        }),
    });

    doc.save(`${title}.pdf`);
    // setdata([])
    
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
        <Menu.Item onClick={() => downloadPDF(data, "All Reports")}>All</Menu.Item>
        <Menu.Item onClick={() => filter("daily")}>Daily</Menu.Item>
        <Menu.Item onClick={() => filter("weekly")}>Weekly</Menu.Item>
        <Menu.Item onClick={() => filter("monthly")}>Monthly</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default DownloadPdf;
