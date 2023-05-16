import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useContext, useState } from "react";
import download from "../../assets/download.svg";
// import Logo from "../../assets/logo.svg";
// import LogoBase64 from "../../assets/logo.svg"
import { Container, Flex, Group, Image, Menu, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import "dayjs/locale/en";
import "dayjs/locale/es";
import moment from "moment";
import Button from "../../Components/Button";
import ViewModal from "../../Components/ViewModal/viewUser";
import Logo from "../../assets/Gau.png";
import { UserContext } from "../../contexts/UserContext";
import { useStyles } from "./Private/styles";

function DownloadPdf({ headCells, data, title, setdata, label }) {
  const { classes } = useStyles();
  const { translate, user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // console.log("data", data);
  const today = moment();
  const oneWeekAgo = moment().subtract(7, "days");

  const filteredDaily = data?.filter(
    (person) => person.date === today.format("YYYY-MM-DD")
  );

  let currentLanguage = localStorage.getItem("lang") || "spanish";
  let locale = currentLanguage === "spanish" ? "es" : "en";

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

  const CustomDate = () => {
    const New = data?.filter((person) => {
      return (
        new Date(person.date) >= new Date(startDate) &&
        new Date(person.date) <= new Date(endDate)
      );
    });
    return New;
  };

  // console.log("CustomDate",CustomDate)

  const filter = (name) => {
    // if(name === "all") {
    //   downloadPDF(filteredDaily, "Daily Reports")
    // }
    if (name === "daily") {
      filteredDaily.length === 0
        ? showNotification({
            title: translate("No Data"),
            message: translate(`No Data Found`),
            color: "red.0",
          })
        : downloadPDF(filteredDaily, `Daily ${label}`);
    }
    if (name === "weekly") {
      filteredWeekly.length === 0
        ? showNotification({
            title: translate("No Data"),
            message: translate(`No Data Found`),
            color: "red.0",
          })
        : downloadPDF(filteredWeekly, `Weekly ${label}`);
    }
    if (name === "monthly") {
      filteredMonthly.length === 0
        ? showNotification({
            title: translate("No Data"),
            message: translate(`No Data Found`),
            color: "red.0",
          })
        : downloadPDF(filteredMonthly, `Monthly ${label}`);
    }
    if (name === "custom") {
      const cus = CustomDate();
      cus.length === 0
        ? showNotification({
            title: translate("No Data"),
            message: translate(`No Data Found`),
            color: "red.0",
          })
        : // setShow(false)
          downloadPDF(cus, `${label}`);
      setShow(false);
    }
  };
  const downloadPDF = (filteredData, title) => {
    const doc = new jsPDF({ orientation: "l" });
    console.log("T", title);
    const logoUrl = "../../assets/download.svg"; // Replace with the URL of your company logo
    const companyName = "GAU";
    const ngoName = user?.ngoId?.ngoName;
    const ngoBranch = "Branch: All About Helping1";
    const currentDate = new Date().toLocaleDateString();

    const marginTop = 5; // Adjust the top margin as needed

    // doc.addImage(Logo, "PNG", logoX, logoY, logoWidth, logoHeight);
    // doc.setFontSize(12);
    // doc.text(companyName, companyNameX, companyNameY);
    // doc.setFontSize(12);
    // doc.text(currentDate, 70, marginTop + 20);

    const logoX = 10; // X position of the logo
    const logoY = 10; // Y position of the logo
    const logoWidth = 40; // Width of the logo
    const logoHeight = 40; // Height of the logo
    const companyNameX = logoX + logoWidth; // X position of the company name
    const companyNameY = logoY + 18; // Y position of the company name
    const ngoNameX = doc.internal.pageSize.getWidth() / 2; // X position of the NGO name (centered)
    const ngoNameY = logoY + 12; // Y position of the NGO name
    const ngoBranchX = doc.internal.pageSize.getWidth() / 2; // X position of the NGO branch (centered)
    const ngoBranchY = ngoNameY + 10; // Y position of the NGO branch

    const dateX = ngoNameX; // X position of the date (centered)
    const dateY = ngoBranchY + 10; // Y position of the date

    doc.addImage(Logo, "PNG", logoX, logoY, logoWidth, logoHeight);
    doc.setFontSize(22);
    doc.setFillColor("red");
    doc.text(companyName, companyNameX, companyNameY, { align: "left" });
    doc.setFontSize(22);
    doc.text(ngoName, ngoNameX, ngoNameY, { align: "center" });
    doc.setFontSize(16);
    doc.text(currentDate, ngoBranchX, ngoBranchY, { align: "center" });
    // doc.text(currentDate, dateX, dateY, { align: "center" });
    doc.text(translate(title), dateX, marginTop + 50, { align: "center" });

    doc.autoTable({
      theme: "grid",
      cellWidth: "auto",
      halign: "left",
      rowPageBreak: "avoid",
      tableWidth: "auto",
      startY: marginTop + 55,

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
      <ViewModal opened={show} setOpened={setShow} title="Select Custom Date">
        <>
          <Flex gap={"md"}>
            <DatePicker
              locale={locale}
              label={translate("Start Date")}
              value={startDate}
              placeholder={translate("Start Date")}
              onChange={setStartDate}
            />
            <DatePicker
              locale={locale}
              placeholder={translate("End Date")}
              label={translate("End Date")}
              value={endDate}
              minDate={startDate}
              onChange={setEndDate}
            />
          </Flex>

          <Group position="right" mt={"xl"}>
            <Button onClick={() => setShow(false)} label={"Cancel"} />
            <Button
              onClick={() => filter("custom")}
              label={"Export"}
              disabled={!startDate || !endDate}
              bg={true}
            />
          </Group>
        </>
      </ViewModal>
    </Container>
  );
}

export default DownloadPdf;
