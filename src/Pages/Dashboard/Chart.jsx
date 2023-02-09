import { Card, Container, Text } from "@mantine/core";
import { useStyles } from "./styles";
import React from "react";
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

const data = [
  {
    name: "0",
    uv: 20,
  },
  {
    name: "1",
    uv: 500,
  },
  {
    name: "2",
    uv: 750,
  },
  {
    name: "3",
    uv: 780,
  },
  {
    name: "4",
    uv: 120,
  },
  {
    name: "5",
    uv: 780,
  },
  {
    name: "6",
    uv: 1000,
  },
];

export default function App() {
  const { classes } = useStyles();
  return (
    <Card
      shadow="xl"
      h="50%"
      // w={700}
      component="a"
      radius={26}
      withBorder
      p="md"
      className={classes.chartcard}
    >
      <Text mb="sm">January 2023</Text>
      <ResponsiveContainer width={"100%"} height={250}>
        <LineChart
          // width={650}
          // height={250}
          data={data}
          margin={{
            top: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#1098AD"
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
