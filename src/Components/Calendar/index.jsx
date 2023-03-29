import { Container, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import moment from "moment/moment";
import { useState } from "react";

const CalendarDate = ({ setDate, getSchedule, scheduleDates, size = "md" }) => {
  const [calenderValue, setCalendarValue] = useState(new Date());
  return (
    <Calendar
      value={calenderValue}
      onChange={(v) => {
        setCalendarValue(v);
        setDate(moment(v).format("YYYY-MM-DD"));
        getSchedule.mutate(moment(v).format("YYYY-MM-DD"));
      }}
      minDate={new Date()}
      maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3, 0))}
      fullWidth
      size={size}
      renderDay={(date) => {
        const day = date.getDate();
        return (
          <Container p={"0px"}>
            <Text
              bg={
                scheduleDates?.includes(moment(date).format("YYYY-MM-DD")) &&
                "green.0"
              }
              color={
                scheduleDates?.includes(moment(date).format("YYYY-MM-DD")) &&
                "rgb(255, 255, 255)"
              }
            >
              {day}
            </Text>
          </Container>
        );
      }}
      styles={(theme) => ({
        calendarBase: { padding: "10px" },
        cell: {
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        },
        day: {
          borderRadius: 0,
          height: 50,
          fontSize: theme.fontSizes.md,
          border: `1px solid ${theme.colors.gray}`,
        },
        weekday: { fontWeight: "bold" },
        calendarHeader: { size: "lg" },
        weekdayCell: {
          fontSize: "20px",
          backgroundColor: theme.colors.grayDark,
          border: `1px solid ${theme.colors.gray}`,
          height: 40,
        },
      })}
    />
  );
};

export default CalendarDate;
