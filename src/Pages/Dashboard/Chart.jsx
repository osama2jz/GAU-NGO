import { Card, Container, Text } from "@mantine/core";
import { useStyles } from "./styles";
import React, { useContext, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { UserContext } from "../../contexts/UserContext";

export default function Chart({ data = [] }) {
  const { classes } = useStyles();
  const [data1, setData1] = useState();
  const today = moment().format("MMMM YYYY");
  const {translate}=useContext(UserContext)

  const a = data.sort((a, b) => {
    return a._id.day - b._id.day;
  });

  // setData1(sorting)

  return (
    <Card
      shadow="xl"
      h="50%"
      component="a"
      radius={26}
      withBorder
      p="md"
      className={classes.chartcard}
    >
      <Text size={18} weight={700} color={"gray"}>
          {moment(today).format("DD")} {translate(moment(today).format("MMMM"))}{" "}
          {translate("Schedule")}
        </Text>
      <ResponsiveContainer width={"100%"} height={250}>
        <LineChart
          data={a && a}
          margin={{
            top: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="_id.day" />
          <YAxis dataKey="count" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#1098AD"
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
