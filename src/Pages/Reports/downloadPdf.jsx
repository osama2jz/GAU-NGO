import React from 'react'
import jsPDF from "jspdf";
import "jspdf-autotable";
import download from "../../assets/download.svg";
import { Flex, Image, Menu, Text } from '@mantine/core';
import { useStyles } from './Private/styles';

function DownloadPdf({headCells, data, title }) {
  const { classes } = useStyles();
  console.log("HEADCELLS: ", headCells)
  console.log("DATA: ", data)
  console.log("TITLE: ", title)
    const downloadPDF = () => {
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
          body: data.map((dataPoint) => {
            console.log("DATA_POINT: ", dataPoint);
            return dataPoint;
          }),
        });
    
        doc.save(`${title}.pdf`)
    };
  return (
    <Menu shadow="md" width={"target"} className={classes.export} >
    <Menu.Target>
      <Flex gap={4} align="center" justify={"space-around"}>
        <Image src={download} width={18} height={18} />
        <Text>Export PDF</Text>
      </Flex>
    </Menu.Target>
    <Menu.Dropdown >
      <Menu.Item onClick={()=>downloadPDF()}>Weekly</Menu.Item>
      <Menu.Item>Monthly</Menu.Item>
      <Menu.Item>Yearly</Menu.Item>
    </Menu.Dropdown>
  </Menu>
  )
}

export default DownloadPdf