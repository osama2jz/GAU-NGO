import {
  ActionIcon,
  Avatar,
  Badge,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Container,
  Switch,
  Table as TableMantine,
  Text,
  useMantineTheme,
  Anchor,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowDown, ArrowUp } from "tabler-icons-react";
import user from "../../assets/teacher.png";
import { UserContext } from "../../contexts/UserContext";
import routeNames from "../../Routes/routeNames";
import Button from "../Button";

const Table = ({
  headCells,
  rowData,
  setViewModalData,
  setViewModalState,
  setOpened,
  setStatusChangeId,
  setEditData,
  setDeleteModalState,
  setEditModalState,
  setDeleteData,
  onStatusChange,
  setReportData,
  setEditDoc,
  editDoc,
  setEditId,
  setEditIDApp
  
}) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
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
    <Paper component={ScrollArea} w={"100%"}>
      <TableMantine striped withBorder width={"100%"}>
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
                    width: head.id === "id" ? "50px" : "auto",
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
                      flexShrink: 0,
                      width: head.id === "id" ? "40px" : "",
                    }}
                    spacing={3}
                    align={"center"}
                    // position={head.numeric === true ? "right" : "left"}
                    position="center"
                  >
                    <Text align="center">{head?.label}</Text>
                    {head.id !== "actions" &&
                      head.id !== "image" &&
                      (!sorted.reversed === true &&
                      sorted.sorted === head.id ? (
                        <ArrowDown size={16} />
                      ) : (
                        <ArrowUp size={16} />
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
              <tr key={index}>
                {headCells?.map((head, index) => {
                  return head.id === "actions" ? (
                    <td key={index}>
                      <Flex justify="center" gap={"sm"}>
                        {head.verify && (
                          <ActionIcon
                            onClick={() => {
                              if (row.accStatus === "active") {
                                navigate(`/userVerification/${row.id}`);
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
                        <ActionIcon
                          onClick={() => {
                            if (setReportData) {
                              setReportData(row);
                            }
                            if(setEditIDApp){
                              navigate(`/view-appointment/${row.id}`,{
                                state:{
                                  editData:row
                                }
                              });

                            }
                            setViewModalState(true);
                            setViewModalData(row.id);
                          }}
                        >
                          {head.view}
                        </ActionIcon>
                        {head.edit && (
                          <ActionIcon
                            onClick={() => {
                              if(setEditId){
                                navigate(`/userEdit/${row.id}`);
                                // setEditId(row.id);
                                // alert("edit id")
                              }
                              if(setEditIDApp){
                                navigate(`/edit-appointment/${row.id}`,{
                                  state:{
                                    editData:row
                                  }
                                });

                              }
                              if (setReportData) {
                                setReportData(row);
                              }
                              // setEditData ?
                              if(setEditDoc){
                                setEditDoc(row);
                              }
                              setEditModalState(true);
                              setViewModalData(row.id);
                              
                              navigate();
                              // setOpened(true);
                            }}
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
                          >
                            {head.delete}
                          </ActionIcon>
                        )}
                      </Flex>
                    </td>
                  ) : head.id === "status" ? (
                    <td key={index} align="center">
                      <Badge
                        radius="xs"
                        color={
                          row[head?.id] === "unverified" ||
                          row[head?.id] === "CLOSED" ||
                          row[head?.id] === "CANCELLED" ||
                          row[head?.id] === "Not Scheduled"
                            ? "red.0"
                            : "green.0"
                        }
                        variant="outline"
                        w={"120px"}
                      >
                        {row[head?.id]}
                      </Badge>
                    </td>
                  ) : head.id === "name" ? (
                    <td key={index} align="center">
                      <Flex gap={3} p="0px" m="0px">
                        {row.image && (
                          <Avatar
                            src={row.image || user}
                            width="30px"
                            radius={"xl"}
                          />
                        )}
                        <Text lineClamp={1}>
                          {row[head?.id]?.length > 100
                            ? row[head?.id].substring(0, 10) + "..."
                            : row[head?.id]}
                        </Text>
                      </Flex>
                    </td>
                  ) : head.id === "file" ? (
                    <td key={index} align="center">
                      <Anchor href={row?.file} target={"_blank"}>
                        Report file
                      </Anchor>
                    </td>
                  ) : head.id === "accStatus" ? (
                    <td key={index} align="center">
                      <Switch
                        onChange={(v) => {
                          setStatusChangeId(row.id);
                          console.log(headCells[1].label);
                          headCells[1].label !== "Branch Name"
                            ? onStatusChange({
                                userId: row.id,
                                userStatus: v.target.checked
                                  ? "active"
                                  : "inactive",
                              })
                            : onStatusChange({
                                branchId: row.id,
                                branchStatus: v.target.checked
                                  ? "active"
                                  : "inactive",
                              });
                        }}
                        defaultChecked={row[head?.id] === "active"}
                        color={"green.0"}
                        w="50%"
                        styles={{
                          track: { backgroundColor: theme.colors.gray },
                        }}
                      />
                    </td>
                  ) : head.id === "userVerify" ? (
                    <td key={index} align="center">
                      <Button
                        label={
                          "Verify"
                        }
                        onClick={() => {
                          if (row.accStatus === "active") {
                            navigate(`/userVerification/${row.id}`);
                          } else {
                            showNotification({
                              title: "User Inactive",
                              message: "Please Activate user first",
                              color: "red.0",
                            });
                          }
                        }}
                        disabled={row.status === "unverified" ? false : true}
                        primary={row.status !== "unverified" ? true:false}
                        compact={true}
                      />
                    </td>
                  ) : head.id === "start" ? (
                    <td key={index} align="center">
                      <Button
                        label="Start"
                        onClick={() => {
                          user.role === "Psychologist"
                            ? navigate(
                                `/start-appointment-p/${row.id}/${row.appointId}`
                              )
                            : navigate(
                                `/start-appointment/${row.id}/${row.appointId}`
                              );
                        }}
                        disabled={row.status === "CLOSED" ? true : false}
                        primary={true}
                        compact={true}
                      />
                    </td>
                  ) : (
                    <td key={index} align="center">
                      {/* {head.date &&
                      row[head?.id]?.split("T")[0] +
                        " " +
                        row[head?.id]?.split("T")[1].split(".")[0]} */}
                      <Text lineClamp={1}>
                        {row[head?.id]?.length > 100
                          ? row[head?.id]?.substring(0, 10) + "..."
                          : row[head?.id]?.toLocaleString()}
                      </Text>
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
            {" "}
            No Data Found
          </Text>
        </Container>
      )}
    </Paper>
  );
};

export default Table;
