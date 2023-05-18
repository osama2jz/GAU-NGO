import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Checkbox,
  Container,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Switch,
  Table as TableMantine,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import Logo from "../../assets/Gau.png";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp, CompassOff } from "tabler-icons-react";
import userImage from "../../assets/teacher.png";
import { UserContext } from "../../contexts/UserContext";
import routeNames from "../../Routes/routeNames";
import Button from "../Button";
import jsPDF from "jspdf";

const Table = ({
  headCells,
  rowData,
  setViewModalData,
  setViewModalState,
  setDeleteModalState,
  setEditModalState,
  setDeleteData,
  onStatusChange,
  setReportData,
  setEditDoc,
  setEditId,
  setEditIDApp,
  setEditProject,
  setEditBranch,
  setEditProfessional,
  setOpenEditModal,
  title="",
  ...props
}) => {
  const navigate = useNavigate();
  const { user, translate } = useContext(UserContext);
  const theme = useMantineTheme();
  const [rowDatas, setRowDatas] = useState(rowData);
  const [selectedData, setSelectedData] = useState([]);
  const [sorted, setSorted] = useState({ sorted: "", reversed: false });

  useEffect(() => {
    setRowDatas(rowData);
  }, [rowData]);

  // Sort
  const sortNumericValue = (label) => {
    setSorted({
      sorted: label,
      reversed: !sorted.reversed,
    });

    const rowDataCopy = [...rowDatas];
    rowDataCopy.sort((dataA, dataB) => {
      if (sorted.reversed === true) {
        return dataB[label] - dataA[label];
      }
      return dataA[label] - dataB[label];
    });
    setRowDatas(rowDataCopy);
  };

  const sortStringValue = (label) => {
    setSorted({ sorted: label, reversed: !sorted.reversed });
    const rowDataCopy = [...rowDatas];
    rowDataCopy.sort((dataA, dataB) => {
      if (sorted.reversed === true) {
        return dataA[label]?.localeCompare(dataB[label]);
      }
      return dataB[label]?.localeCompare(dataA[label]);
    });
    setRowDatas(rowDataCopy);
  };

  // const downloadPDF = () => {
  //   const doc = new jsPDF({ orientation: "l" });
  //   const companyName = "GAU";
  //   const ngoName = user?.ngoId?.ngoName;
  //   const currentDate = new Date().toLocaleDateString();
  //   const marginTop = 5; // Adjust the top margin as needed

  //   const logoX = 10; // X position of the logo
  //   const logoY = 10; // Y position of the logo
  //   const logoWidth = 40; // Width of the logo
  //   const logoHeight = 40; // Height of the logo
  //   const companyNameX = logoX + logoWidth; // X position of the company name
  //   const companyNameY = logoY + 18; // Y position of the company name
  //   const ngoNameX = doc.internal.pageSize.getWidth() / 2; // X position of the NGO name (centered)
  //   const ngoNameY = logoY + 12; // Y position of the NGO name
  //   const ngoBranchX = doc.internal.pageSize.getWidth() / 2; // X position of the NGO branch (centered)
  //   const ngoBranchY = ngoNameY + 10; // Y position of the NGO branch

  //   const dateX = ngoNameX; // X position of the date (centered)
  //   const dateY = ngoBranchY + 10; // Y position of the date

  //   doc.addImage(Logo, "PNG", logoX, logoY, logoWidth, logoHeight);
  //   doc.setFontSize(22);
  //   doc.setFillColor("red");
  //   doc.text(companyName, companyNameX, companyNameY, { align: "left" });
  //   doc.setFontSize(22);
  //   doc.text(ngoName, ngoNameX, ngoNameY, { align: "center" });
  //   doc.setFontSize(16);
  //   doc.text(currentDate, ngoBranchX, ngoBranchY, { align: "center" });
  //   // doc.text(currentDate, dateX, dateY, { align: "center" });
  //   doc.text(translate("Custom Export"), dateX, marginTop + 50, { align: "center" });

  //   doc.autoTable({
  //     theme: "grid",
  //     cellWidth: "auto",
  //     halign: "left",
  //     rowPageBreak: "avoid",
  //     tableWidth: "auto",
  //     startY: marginTop + 55,

  //     columns: headCells.slice(0, -1).map((col) => {
  //       return {
  //         dataKey: col.id,
  //         header: translate(col.label),
  //       };
  //     }),
  //     body:
  //       selectedData &&
  //       selectedData.map((dataPoint) => {
  //         return dataPoint;
  //       }),
  //   });

  //   doc.save(`${translate("Custom Export")}.pdf`);
  //   setStartDate(null);
  //   setEndDate(null);
  //   // setdata([])

  // };

  // const title = "Title";
  const downloadPDF = () => {
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
    doc.text(`${translate("Date")}: ${currentDate}`, dateX, dateY, { align: "left" });
    doc.text(`${translate("Time")}: ${currentTime}`, timeX, timeY, { align: "right" });
    doc.setFontSize(16);
    doc.text(translate("Custom Selected")+" " +translate(title), titleX, titleY, { align: "center" });

    doc.autoTable({
      theme: "grid",
      cellWidth: "auto",
      halign: "left",
      rowPageBreak: "avoid",
      tableWidth: "auto",
      startY: ngoBranchY + 14,

      columns: headCells?.slice(0, -1).map((col) => {
        return {
          dataKey: col.id,
          header: translate(col.label),
        };
      }),
      body:
        selectedData &&
        selectedData.map((dataPoint, index) => {
          return {
            ...dataPoint,
            sr: index + 1,
            role: translate(dataPoint?.role),
            refer: translate(dataPoint?.refer),
            accStatus: translate(dataPoint?.accStatus),
            status: translate(dataPoint?.status),
            type: translate(dataPoint?.type),
            userType: translate(dataPoint?.userType),
          };
        }),
      didDrawPage: function (data) {
        // Footer
        const footerX = doc.internal.pageSize.getWidth() - 20;
        const footerY = doc.internal.pageSize.getHeight() - 10;
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(
          translate("Page")+" "+ doc.internal.getCurrentPageInfo().pageNumber,
          footerX,
          footerY,
          {
            align: "center",
          }
        );
      },
    });

    doc.save(`${translate("Custom Selected")+" " +translate(title)}.pdf`);
    // setdata([])
  };

  return (
    <Paper component={ScrollArea}>
      {selectedData.length > 0 && title!=="" && (
        <Button label={"Export Selected"} onClick={downloadPDF} />
      )}
      <TableMantine striped withBorder>
        <thead
          style={{
            backgroundColor: "lightgray",
            height: "40px",
          }}
        >
          <tr>
            {headCells?.map((head, index) => {
              return (
                <th
                  key={index}
                  style={{
                    whiteSpace: "nowrap",
                    width: head.id === "sr" ? "20px" : "auto",
                  }}
                  onClick={() => {
                    head.numeric === true
                      ? sortNumericValue(head.id)
                      : sortStringValue(head.id);
                  }}
                >
                  <Group
                    style={{
                      flexWrap: "nowrap",
                      // flexShrink: 0,
                      width:
                        head.id === "sr"
                          ? "50px"
                          : head.id === "name"
                          ? "200px"
                          : head.id === "accStatus" ||
                            head.id === "userVerify" ||
                            head.id === "start" ||
                            // head.id === "time" ||
                            head.id === "refer" ||
                            head.id === "reply"
                          ? "auto"
                          : "130px",
                    }}
                    spacing={3}
                    align={"center"}
                  >
                    <Text align="center">{translate(head?.label)}</Text>
                    {head.id !== "actions" &&
                      head.id !== "image" &&
                      (!sorted.reversed === true &&
                      sorted.sorted === head.id ? (
                        <ActionIcon>
                          <ArrowDown size={16} />
                        </ActionIcon>
                      ) : (
                        <ActionIcon>
                          <ArrowUp size={16} />
                        </ActionIcon>
                      ))}
                  </Group>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rowDatas?.map((row, index) => {
            return (
              <tr key={row.id}>
                {headCells?.map((head, index) => {
                  return head.id === "actions" ? (
                    <td key={index}>
                      <Flex gap={"sm"}>
                        {head.verify && (
                          <ActionIcon
                            onClick={() => {
                              if (row.accStatus === "active") {
                                navigate(`/userVerification`, {
                                  state: {
                                    id: row.id,
                                    image: row.image,
                                  },
                                });
                              } else {
                                showNotification({
                                  title: "User is not verified",
                                  message: "Please verify user first",
                                  color: "red.0",
                                });
                              }
                            }}
                            disabled={row.status !== "unverified"}
                          >
                            {row.status === "unverified" ? head.verify : ""}
                          </ActionIcon>
                        )}
                        {head.view && (
                          <ActionIcon
                            onClick={() => {
                              if (setReportData) {
                                setReportData(row);
                              }
                              if (setEditIDApp) {
                                navigate(`/view-appointment`, {
                                  state: {
                                    editData: row,
                                  },
                                });
                              }
                              if (setViewModalData) {
                                setViewModalData(row.id);
                              }
                              if (setViewModalState) {
                                if (row.status === "verified") {
                                  navigate(routeNames.ngoAdmin.viewUser, {
                                    state: {
                                      userData: row.id,
                                    },
                                  });
                                  return;
                                } else {
                                  setViewModalState(true);
                                }
                              }

                              // setViewModalData(row.id);
                            }}
                            color={"blue.9"}
                            variant="outline"
                          >
                            {head.view}
                          </ActionIcon>
                        )}
                        {head.edit && (
                          <ActionIcon
                            onClick={() => {
                              if (setEditId) {
                                if (row.status === "unverified") {
                                  navigate(`/add-user`, {
                                    state: {
                                      editData: row,
                                    },
                                  });
                                  return;
                                } else {
                                  navigate(`/userVerification`, {
                                    state: {
                                      editId: row.id,
                                    },
                                  });
                                  return;
                                }
                              }
                              if (setEditIDApp) {
                                navigate(`/edit-appointment`, {
                                  state: {
                                    editData: row,
                                  },
                                });
                                return;
                              }
                              if (setEditBranch) {
                                navigate(`/edit-branch`, {
                                  state: {
                                    editData: row,
                                  },
                                });
                                return;
                              }
                              if (setEditProject) {
                                navigate(routeNames.ngoAdmin.addProject, {
                                  state: {
                                    editData: row,
                                  },
                                });
                                return;
                              }
                              if (setEditProfessional) {
                                navigate(`/edit-professional`, {
                                  state: {
                                    editData: row,
                                  },
                                });
                                return;
                              }
                              if (setReportData) {
                                setReportData(row);
                              }
                              if (setEditDoc) {
                                setEditDoc(row);
                              }
                              if (props.setEditDictionary) {
                                navigate(routeNames.ngoAdmin.addDictionary, {
                                  state: {
                                    editData: row,
                                  },
                                });
                              }
                              setEditModalState && setEditModalState(true);
                            }}
                            disabled={
                              row.accStatus === "inactive" ||
                              row.status === "SCHEDULED" ||
                              row.status === "CANCELLED" ||
                              row.status === "INPROGRESS"
                                ? true
                                : false
                            }
                            color="green.9"
                            variant="outline"
                          >
                            {head.edit}
                          </ActionIcon>
                        )}
                        {head.delete && (
                          <ActionIcon
                            onClick={() => {
                              setDeleteModalState(true);
                              setDeleteData(row.id);
                            }}
                            disabled={row.accStatus === "inactive"}
                            color="red.9"
                            variant="outline"
                          >
                            {head.delete}
                          </ActionIcon>
                        )}
                      </Flex>
                    </td>
                  ) : head.id === "status" ? (
                    <td key={index}>
                      <Badge
                        radius="xs"
                        color={
                          row[head?.id] === "unverified" ||
                          row[head?.id] === "CLOSED" ||
                          row[head?.id] === "CANCELLED" ||
                          row[head?.id] === "No Roaster" ||
                          row[head?.id] === "inprogress" ||
                          row[head?.id] === "scheduled"
                            ? "red.9"
                            : "green.9"
                        }
                        variant="filled"
                        w={"120px"}
                      >
                        {translate(row[head?.id])}
                      </Badge>
                    </td>
                  ) : head.id === "name" ? (
                    <td key={index}>
                      <Flex gap={"sm"} p="0px" m="0px" align={"center"}>
                        {/* {row.image && ( */}
                        <Avatar src={row.image} width="30px" radius={"xl"}>
                          {row[head?.id][0] + row[head?.id][1]}
                        </Avatar>
                        {/* )} */}
                        <Tooltip label={row[head?.id]}>
                          <Text lineClamp={1}>
                            {row[head?.id]?.length > 100
                              ? row[head?.id].substring(0, 10) + "..."
                              : row[head?.id]}
                          </Text>
                        </Tooltip>
                      </Flex>
                    </td>
                  ) : head.id === "totalAppointments" ? (
                    <td key={index} align="center">
                      <Flex gap={"lg"} p="0px" m="0px">
                        <Tooltip label={row[head?.id]}>
                          <Text lineClamp={1}>
                            {row[head?.id]?.length > 100
                              ? row[head?.id].substring(0, 10) + "..."
                              : row[head?.id]}
                          </Text>
                        </Tooltip>
                        <Anchor
                          onClick={() => {
                            row.projectName
                              ? navigate(
                                  routeNames.socialWorker.projectAppointments,
                                  {
                                    state: {
                                      id: row.id,
                                      data: row.projectName,
                                    },
                                  }
                                )
                              : navigate(
                                  routeNames.socialWorker.caseAppointments,
                                  {
                                    state: { id: row.case, data: row.caseName },
                                  }
                                );
                          }}
                        >
                          {translate("View All")}
                        </Anchor>
                      </Flex>
                    </td>
                  ) : head.id === "totalUsers" ? (
                    <td key={index} align="center">
                      <Flex gap={"lg"} p="0px" m="0px">
                        <Tooltip label={row[head?.id]}>
                          <Text lineClamp={1}>
                            {row[head?.id]?.length > 100
                              ? row[head?.id].substring(0, 10) + "..."
                              : row[head?.id]}
                          </Text>
                        </Tooltip>
                        <Anchor
                          onClick={() => {
                            navigate(routeNames.socialWorker.projectUsers, {
                              state: { id: row.id, data: row.projectName },
                            });
                          }}
                        >
                          {translate("View All")}
                        </Anchor>
                      </Flex>
                    </td>
                  ) : head.id === "totalCases" ? (
                    <td key={index} align="center">
                      <Flex gap={"lg"} p="0px" m="0px">
                        <Tooltip label={row[head?.id]}>
                          <Text lineClamp={1}>
                            {row[head?.id]?.length > 100
                              ? row[head?.id].substring(0, 10) + "..."
                              : row[head?.id]}
                          </Text>
                        </Tooltip>
                        <Anchor
                          onClick={() => {
                            navigate(routeNames.socialWorker.projectCases, {
                              state: { id: row.id, data: row.projectName },
                            });
                          }}
                        >
                          {translate("View All")}
                        </Anchor>
                      </Flex>
                    </td>
                  ) : head.id === "totalReports" ? (
                    <td key={index} align="center">
                      <Flex gap={"lg"} p="0px" m="0px">
                        <Tooltip label={row[head?.id]}>
                          <Text lineClamp={1}>
                            {row[head?.id]?.length > 100
                              ? row[head?.id].substring(0, 10) + "..."
                              : row[head?.id]}
                          </Text>
                        </Tooltip>
                        <Anchor
                          onClick={() => {
                            row.projectName
                              ? navigate(
                                  routeNames.socialWorker.projectReport,
                                  {
                                    state: {
                                      id: row.id,
                                      data: row.projectName,
                                    },
                                  }
                                )
                              : navigate(
                                  routeNames.socialWorker.referalReport,
                                  {
                                    state: { id: row.case, data: row.caseName },
                                  }
                                );
                          }}
                        >
                          {translate("View All")}
                        </Anchor>
                      </Flex>
                    </td>
                  ) : head.id === "file" ? (
                    <td key={index}>
                      {row?.file !== "" ? (
                        <Anchor href={row?.file} target={"_blank"}>
                          {translate("View All")}
                        </Anchor>
                      ) : (
                        <Text>{translate("No File")}</Text>
                      )}
                    </td>
                  ) : head.id === "documentURL" ? (
                    <td key={index}>
                      {row?.documentURL !== "" ? (
                        <Anchor href={row?.documentURL} target={"_blank"}>
                          {translate(row?.documentType)}
                        </Anchor>
                      ) : (
                        <Text>{translate("No File")}</Text>
                      )}
                    </td>
                  ) : head.id === "reply" ? (
                    <td key={index}>
                      {row?.reply ? (
                        <Badge color={"green"} variant="filled">
                          {translate("Replied")}
                        </Badge>
                      ) : user.role === "User" ? (
                        <Badge color={"red"} variant="filled">
                          {translate("Pending")}
                        </Badge>
                      ) : (
                        <Anchor
                          color={"red"}
                          onClick={() => {
                            props.setOpenReplyModal(true);
                            props.setReplyModalId(row?.id);
                          }}
                        >
                          {translate("Reply Now")}
                        </Anchor>
                      )}
                    </td>
                  ) : head.id === "accStatus" ? (
                    <td key={index} align="center">
                      <Switch
                        onChange={(v) => {
                          if (headCells[1].label === "Branch Name") {
                            onStatusChange({
                              branchId: row.id,
                              branchStatus: v.target.checked
                                ? "active"
                                : "inactive",
                            });
                          } else if (headCells[1].label === "Project Name") {
                            onStatusChange({
                              projectId: row.id,
                              status: v.target.checked ? "active" : "inactive",
                            });
                          } else {
                            onStatusChange({
                              userId: row.id,
                              userStatus: v.target.checked
                                ? "active"
                                : "inactive",
                            });
                          }
                        }}
                        defaultChecked={row[head?.id] === "active"}
                        color={"green.9"}
                        w="50%"
                        styles={{
                          track: { backgroundColor: theme.colors.red },
                        }}
                      />
                    </td>
                  ) : head.id === "userVerify" ? (
                    <td key={index}>
                      <Button
                        label={
                          row.status === "unverified" ? "Verify" : "Verified"
                        }
                        onClick={() => {
                          if (row.accStatus === "active") {
                            navigate(`/userVerification`, {
                              state: {
                                id: row.id,
                              },
                            });
                          } else {
                            showNotification({
                              title: "User Inactive",
                              message: "Please Activate user first",
                              color: "red.9",
                            });
                          }
                        }}
                        disabled={row.status === "unverified" ? false : true}
                        bg={row.status === "unverified" && true}
                        compact={true}
                        w="auto"
                      />
                    </td>
                  ) : head.id === "close" ? (
                    <td key={index}>
                      <Button
                        label={"Close Case"}
                        onClick={() => {
                          setDeleteModalState(true);
                          setDeleteData(row.case);
                        }}
                        compact={true}
                        disabled={row.status === "closed"}
                      />
                    </td>
                  ) : head.id === "start" ? (
                    <td key={index}>
                      <Button
                        label="Start"
                        onClick={() => {
                          user.role === "Psychologist"
                            ? navigate(`/start-appointment-p`, {
                                state: {
                                  id: row.userid,
                                  appId: row.appointId,
                                  appData: row,
                                },
                              })
                            : navigate(`/start-appointment`, {
                                state: {
                                  id: row.userid,
                                  appId: row.appointId,
                                  appData: row,
                                },
                              });
                        }}
                        disabled={
                          row.status === "SCHEDULED" ||
                          row.status === "INPROGRESS"
                            ? false
                            : true
                        }
                        primary={true}
                        compact={true}
                      />
                    </td>
                  ) : head.translate ? (
                    <td key={index}>
                      <Tooltip label={row[head?.id]}>
                        <Text
                          lineClamp={1}
                          color={head.id === "docs" && "red.9"}
                          fw={head.id === "docs" && 1000}
                        >
                          {translate(
                            row[head?.id]?.length > 100
                              ? row[head?.id]?.substring(0, 10) + "..."
                              : row[head?.id]
                          )}
                        </Text>
                      </Tooltip>
                    </td>
                  ) : head.id === "sr" ? (
                    <td key={index}>
                      <Flex gap="md">
                        { title !=="" && <Checkbox
                          onChange={(e) => {
                            if (!e.currentTarget.checked) {
                              setSelectedData((data) => {
                                return data.filter(
                                  (dataEntry) => row.id !== dataEntry.id
                                );
                              });
                            } else {
                              setSelectedData((e) => [...e, row]);
                            }
                          }}
                        />}
                        <Text align="right">{row[head?.id]}</Text>
                      </Flex>
                    </td>
                  ) : (
                    <td key={index}>
                      <Tooltip label={row[head?.id]}>
                        <Text
                          lineClamp={1}
                          color={head.id === "docs" && "red.9"}
                          fw={head.id === "docs" && 1000}
                        >
                          {row[head?.id]?.length > 100
                            ? row[head?.id]?.substring(0, 10) + "..."
                            : row[head?.id]}
                        </Text>
                      </Tooltip>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </TableMantine>
      {rowDatas?.length === 0 && (
        <Container>
          <Text
            align="center"
            pt={8}
            sx={{
              fontFamily: "Greycliff CF, sans-serif",
              margin: "auto",
            }}
            fz="md"
            fw={600}
            mt={8}
            color="rgb(0,0,0,0.5)"
          >
            {translate("No Data Found")}
          </Text>
        </Container>
      )}
    </Paper>
  );
};

export default Table;
