import React, { useContext } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import download from "../../assets/download.svg";
import { Flex, Image, Menu, Text } from "@mantine/core";
import { useStyles } from "./Private/styles";
import moment from "moment";
import { showNotification } from "@mantine/notifications";
import { UserContext } from "../../contexts/UserContext";

function DownloadPdf({ headCells, data, title, setdata, label }) {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);

  // console.log("data", data);
  const today = moment();
  const oneWeekAgo = moment().subtract(7, "days");

  const filteredDaily = data?.filter(
    (person) => person.date === today.format("YYYY-MMM-DD")
  );

  const filteredWeekly = data?.filter((person) => {
    return (
      new Date(person.date) >= new Date(oneWeekAgo) &&
      new Date(person.date) <= new Date(today)
    );
  });
  const filteredMonthly = data?.filter(
    (person) => person?.date?.substr(5, 3) === today.format("MMM")
  );

  const filter = (name) => {
    // if(name === "all") {
    //   downloadPDF(filteredDaily, "Daily Reports")
    // }
    if (name === "daily") {
      filteredDaily.length === 0
        ? showNotification({
            title: "No Data",
            message: `No ${label} for today`,
            color: "green.0",
          })
        : downloadPDF(filteredDaily, `Daily ${label}`);
    }
    if (name === "weekly") {
      filteredWeekly.length === 0
        ? showNotification({
            title: "No Data",
            message: `No ${label} for the week`,
            color: "green.0",
          })
        : downloadPDF(filteredWeekly, `Weekly ${label}`);
    }
    if (name === "monthly") {
      filteredMonthly.length === 0
        ? showNotification({
            title: "No Data",
            message: `No ${label} for the Month`,
            color: "green.0",
          })
        : downloadPDF(filteredMonthly, `Monthly ${label}`);
    }
  };
  const downloadPDF = (filteredData, title) => {
    const doc = new jsPDF({ orientation: "l" });
    console.log("T", title);

    doc.text(translate(title), 13, 10);
    // doc.addImage("https://media.istockphoto.com/id/535695503/photo/pakistan-monument-islamabad.jpg?s=612x612&w=0&k=20&c=bNqjdf8L-5igcRB89DdMgx0kNOmyeo1J_zzXmoxxl8w=", "JPEG", 0, 0, 50, 50);

    doc.autoTable({
      theme: "grid",
      cellWidth: "auto",
      halign: "left",
      rowPageBreak: "avoid",
      tableWidth: "auto",

      columns: headCells.slice(0, -1).map((col) => {
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

    doc.save(`${translate(title)}.pdf`);
    // setdata([])
  };

  return (
    <Menu shadow="md" width={"target"} className={classes.export}>
      <Menu.Target>
        <Flex
          gap={4}
          align="center"
          justify={"space-around"}
          style={{ border: "1px solid rgb(0, 0, 0, 0.1)", width: "150px" }}
        >
          <Image src={download} width={18} height={18} />
          <Text>{translate("Export PDF")}</Text>
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => downloadPDF(data, `All ${label}`)}>
          {translate("All")}
        </Menu.Item>
        <Menu.Item onClick={() => filter("daily")}>
          {translate("Daily")}
        </Menu.Item>
        <Menu.Item onClick={() => filter("weekly")}>
          {translate("Weekly")}
        </Menu.Item>
        <Menu.Item onClick={() => filter("monthly")}>
          {translate("Monthly")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default DownloadPdf;
