import { Calendar } from "@mantine/dates";
import moment from "moment";
import { useState } from "react";

const CalendarDate = () => {
  const [calenderValue, setCalendarValu] = useState(new Date());
  // console.log(moment().startOf("month").format("DD MM YYYY"))
  return (
    <Calendar
      value={calenderValue}
      onChange={setCalendarValu}
      minDate={moment(new Date()).startOf("month").format("DD MM YYYY")}
      maxDate={moment(new Date()).endOf("month").format("DD MM YYYY")}
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
