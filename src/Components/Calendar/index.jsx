import { Calendar } from "@mantine/dates";
import moment from "moment";
import { useState } from "react";
import moment from "moment/moment";

const CalendarDate = ({ setDate, getSchedule }) => {
  const [calenderValue, setCalendarValue] = useState(new Date());
  return (
    <Calendar
      value={calenderValue}
      onChange={(v) => {
        setCalendarValue(v);
        setDate(moment(v).format("YYYY-MM-DD"));
        getSchedule.mutate(moment(v).format("YYYY-MM-DD"));
      }}
      // month={value}
      fullWidth
      size="md"
      styles={(theme) => ({
        calendarBase: { padding: "10px" },
        selected: { color: "red" },
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
