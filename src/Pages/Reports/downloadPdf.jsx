import React, { useContext, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import download from "../../assets/download.svg";
import { Flex, Group, Image, Menu, Modal, Text,Container } from "@mantine/core";
import { useStyles } from "./Private/styles";
import moment from "moment";
import { showNotification } from "@mantine/notifications";
import { UserContext } from "../../contexts/UserContext";

import ViewModal from "../../Components/ViewModal/viewUser";

import Button from "../../Components/Button";
// import Datepicker from "../../Components/Datepicker";
import { DatePicker } from "@mantine/dates";


function DownloadPdf({ headCells, data, title, setdata, label }) {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const [show,setShow]=useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // console.log(startDate,endDate)

  // console.log("data", data);
  const today = moment();
  const oneWeekAgo = moment().subtract(7, "days");

  const filteredDaily = data?.filter(
    (person) => person.date === today.format("YYYY-MMM-DD")
  );

  const filteredWeekly = data?.filter((person) => {
    // console.log("person",new Date(person.date),"oneWeekAgo",new Date(oneWeekAgo),"today",new Date(today))
    return (
      new Date(person.date) >= new Date(oneWeekAgo) &&
      new Date(person.date) <= new Date(today)
    );
  });
  const filteredMonthly = data?.filter(
    (person) => person?.date?.substr(5, 3) === today.format("MMM")
  );

  const CustomDate=()=>{
    const New=data?.filter((person) => {
      console.log("person",new Date (person.date),"Start Date",startDate,"<=" ," >=","endDate",endDate,":",new Date(person.date) <= startDate &&
      new Date(person.date) >= endDate)
      return (
        new Date(person.date) >= new Date(startDate) &&
        new Date(person.date) <= new Date(endDate)
      );
    })
    console.log("New",New)
    return New
  }

  // console.log("CustomDate",CustomDate)

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
    if(name==="custom"){
      const cus=CustomDate()
      cus.length === 0
        ? showNotification({
            title: "No Data",
            message: `No ${label} for the selected dates`,
            color: "green.0",
          })
          
        :
        // setShow(false) 
        downloadPDF(cus, `Custom ${label}`);
        setShow(false)
        
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
    <Container>
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
        <Menu.Item onClick={() => setShow(true)}>
          {translate("Custom")}
        </Menu.Item>
      </Menu.Dropdown>
    
      {/* {show && <DatePicker type="range" allowSingleDateInRange/>} */}
      
    </Menu>
    <ViewModal opened={show}
        setOpened={setShow}
        title="Select Custom Date">
          <>
          <Flex gap={"md"}>
          <DatePicker label={"Start Date"} value={startDate} onChange={setStartDate}/>
          <DatePicker label={"End Date"} value={endDate} onChange={setEndDate}/>
          </Flex>
         
          <Group position="right" mt={"xl"}>
          <Button onClick={()=>setShow(false)} label={"Cancel"}/>
          <Button onClick={()=>filter("custom")} label={"Export"} bg={true}/>
          </Group>
          </>
     
    </ViewModal>
    </Container>
  );
}

export default DownloadPdf;
