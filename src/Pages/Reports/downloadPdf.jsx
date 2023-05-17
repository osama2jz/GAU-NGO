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

const getTranslatedData = (person, translate) => {
  // const { translate } = useContext(UserContext);
  return {
    ...person,
    role: translate(person?.role),
    refer: translate(person?.refer),
    accStatus: translate(person?.accStatus),
    status: translate(person?.status),
    type: translate(person?.type),
    userType: translate(person?.userType),
  };
};

function DownloadPdf({ headCells, data, title, setdata, label }) {
  const { classes } = useStyles();
  const { translate, user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // console.log("data", data);
  const today = moment();
  const oneWeekAgo = moment().subtract(7, "days");

  const AllData = data?.map((person) => ({
    ...person,
    role: translate(person?.role),
    refer: translate(person?.refer),
    accStatus: translate(person?.accStatus),
    status: translate(person?.status),
    type: translate(person?.type),
    userType: translate(person?.userType),
  }));

  const filteredDaily = data
    ?.filter((person) => person.date === today.format("YYYY-MM-DD"))
    .map((person) => ({
      ...person,
      role: translate(person?.role),
      refer: translate(person?.refer),
      accStatus: translate(person?.accStatus),
      status: translate(person?.status),
      type: translate(person?.type),
      userType: translate(person?.userType),
    }));

  let currentLanguage = localStorage.getItem("lang") || "spanish";
  let locale = currentLanguage === "spanish" ? "es" : "en";

  const filteredWeekly = data
    ?.filter((person) => {
      return (
        new Date(person.date) >= new Date(oneWeekAgo) &&
        new Date(person.date) <= new Date(today)
      );
    })
    .map((person) => ({
      ...person,
      role: translate(person?.role),
      refer: translate(person?.refer),
      accStatus: translate(person?.accStatus),
      status: translate(person?.status),
      type: translate(person?.type),
      userType: translate(person?.userType),
    }));

  const filteredMonthly = data
    ?.filter((person) => person?.date?.substr(5, 2) === today.format("MM"))
    .map((person) => ({
      ...person,
      role: translate(person?.role),
      refer: translate(person?.refer),
      accStatus: translate(person?.accStatus),
      status: translate(person?.status),
      type: translate(person?.type),
      userType: translate(person?.userType),
    }));
  const CustomDate = () => {
    const New = data
      ?.filter((person) => {
        return (
          moment(person.date).format("YYYY-MM-DD") >=
            moment(startDate).format("YYYY-MM-DD") &&
          moment(person.date).format("YYYY-MM-DD") <=
            moment(endDate).format("YYYY-MM-DD")
        );
      })
      .map((person) => ({
        ...person,
        role: translate(person?.role),
        refer: translate(person?.refer),
        accStatus: translate(person?.accStatus),
        status: translate(person?.status),
        type: translate(person?.type),
        userType: translate(person?.userType),
      }));
    return New;
  };

  // console.log("CustomDate",CustomDate)

  const filter = (name) => {
    if (name === "all") {
      AllData.length === 0
        ? showNotification({
            title: translate("No Data"),
            message: translate(`No Data Found`),
            color: "red.0",
          })
        : downloadPDF(AllData, `All ${label}`);
    }
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
    setEndDate(null);
    setStartDate(null);
  };
  const downloadPDF = (filteredData, title) => {
    const doc = new jsPDF({ orientation: "l" });

    const logoUrl = "../../assets/download.svg"; // Replace with the URL of your company logo
    const companyName = "GAU";
    const ngoName = user?.ngoId?.ngoName;
    const ngoBranch = "Branch: All About Helping1";
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const marginTop = 10; // Adjust the top margin as needed

    const logoWidth = 25; // Width of the logo
    const logoHeight = 25; // Height of the logo
    const logoX = (doc.internal.pageSize.getWidth() - logoWidth) / 2; // X position of the logo
    const logoY = marginTop; // Y position of the logo
    const companyNameX =
      (doc.internal.pageSize.getWidth() - doc.getTextWidth(companyName)) / 2; // X position of the company name
    const companyNameY = logoY + logoHeight + 5; // Y position of the company name
    const ngoNameX = doc.internal.pageSize.getWidth() / 2; // X position of the NGO name (centered)
    const ngoNameY = companyNameY + 15; // Y position of the NGO name
    const ngoBranchX = doc.internal.pageSize.getWidth() / 2; // X position of the NGO branch (centered)
    const ngoBranchY = ngoNameY + 8; // Y position of the NGO branch

    const dateX = 20; // X position of the date (left-aligned)
    const dateY = marginTop + 45; // Y position of the date
    const timeX = doc.internal.pageSize.getWidth() - 20; // X position of the time (right-aligned)
    const timeY = marginTop + 45; // Y position of the time
    const titleX = doc.internal.pageSize.getWidth() / 2; // X position of the title (centered)
    const titleY = marginTop + 60; // Y position of the title

    doc.addImage(Logo, "PNG", logoX - 8, logoY, logoWidth, logoHeight);
    doc.setFontSize(22);
    doc.setFillColor("red");
    doc.text(companyName, companyNameX + 10, companyNameY - 14.5, {
      align: "left",
    });
    doc.setFontSize(22);
    doc.text(ngoName, ngoNameX, ngoNameY, { align: "center" });

    // Draw a line separating the header and content
    doc.setLineWidth(0.5);
    doc.line(
      10,
      ngoBranchY + 0,
      doc.internal.pageSize.getWidth() - 10,
      ngoBranchY + 0
    );

    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, dateX, dateY, { align: "left" });
    doc.text(`Time: ${currentTime}`, timeX, timeY, { align: "right" });
    doc.setFontSize(14);
    doc.text(translate(title), titleX, titleY, { align: "center" });

    doc.autoTable({
      theme: "grid",
      cellWidth: "auto",
      halign: "left",
      rowPageBreak: "avoid",
      tableWidth: "auto",
      startY: ngoBranchY + 10,

      columns: headCells?.slice(0, -1).map((col) => {
        return {
          dataKey: col.id,
          header: translate(col.label),
        };
      }),
      body: filteredData || [],
      didDrawPage: function (data) {
        // Footer
        const footerX = doc.internal.pageSize.getWidth() - 20;
        const footerY = doc.internal.pageSize.getHeight() - 10;
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(
          "Page " + doc.internal.getCurrentPageInfo().pageNumber,
          footerX,
          footerY,
          {
            align: "center",
          }
        );
      },
    });

    doc.save(`${translate(title)}.pdf`);
    setStartDate(null);
    setEndDate(null);
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
          <Menu.Item onClick={() => filter("all")}>
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
              onChange={(e) => {
                setStartDate(e);
                setEndDate(null);
              }}
            />
            <DatePicker
              locale={locale}
              placeholder={translate("End Date")}
              label={translate("End Date")}
              value={endDate}
              minDate={startDate}
              maxDate={new Date(moment(startDate).add(2, "year"))}
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
