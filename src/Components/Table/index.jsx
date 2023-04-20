import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
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

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp } from "tabler-icons-react";
import userImage from "../../assets/teacher.png";
import { UserContext } from "../../contexts/UserContext";
import routeNames from "../../Routes/routeNames";
import Button from "../Button";

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
  ...props
}) => {
  const navigate = useNavigate();
  const { user, translate } = useContext(UserContext);
  const theme = useMantineTheme();
  const [rowDatas, setRowDatas] = useState(rowData);
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
  return (
    <Paper component={ScrollArea}>
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
                                    image:row.image
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
                            ? navigate(
                                `/start-appointment-p`, {
                                  state: {
                                    id: row.userid,
                                    appId: row.appointId,
                                    appData: row,
                                  },
                                }
                              )
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
